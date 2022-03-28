import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayByID = state.days.filter((day) => day.appointments.includes(id));
      
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
