import { useState, useEffect } from "react";
import axios from "axios";


// All Hooks and app data to be used in Application JS //
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Sets day when called **** Defaults to Monday //
  const setDay = (day) => setState({ ...state, day });

  // Grabs All data from populated from DB on render and setState when any data changes. Uses promises and prev to only update appropriate data and leave rest unchanged. // 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  // adds new interview data to state from Form 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Finding day that includes id passed to bookInterview
    const dayByID = state.days.filter((day) => day.appointments.includes(id));
      
    // updating state.days array to update 'spots' with axios  
    const days = state.days.map((day) => {
      if (state.appointments[id].interview === null && dayByID[0].name === day.name)  {
        return { ...day, spots: day.spots - 1 };
      }
      return day;
    });
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });

  }

  // remove interview from DB by matching id //
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    const dayByID = state.days.filter((day) => day.appointments.includes(id));
      
    // delete spots in state.days array with axios
    const days = state.days.map((day) => {
      if (dayByID[0].name === day.name)  {
        return { ...day, spots: day.spots + 1 };
      }
      return day;
    });

    return axios.delete(`api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, cancelInterview, bookInterview };
}
