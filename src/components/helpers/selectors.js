

// renders correct appts based on current state, and day selected
export function getAppointmentsForDay(state, day) {

  const appointments = [];
    
  //matched where days.name = current day
  const daysAppointments = state.days.filter(e => e.name === day)

  if (!daysAppointments[0]){
    return appointments;
  }

  //loop daysAppointments & push all state.appointments that match to appointments array
  for (let appt of daysAppointments[0].appointments) {
    appointments.push(state.appointments[appt]);
    
  }
  
  return appointments;
}



// gets all interviews based on state and current interview object
export function getInterview(state, interview) {

  const interviewObj = {}

  if(!interview){
    return null
  }
 
  // sets new interviewObj 
  interviewObj.student = interview.student
  interviewObj.interviewer = state.interviewers[interview.interviewer]

 return interviewObj;

}


// renders correct interviewers based on current state, and day selected
export function getInterviewersForDay(state, day) {

   const interviewerArr = [];
    
  //matched where days.name = current day 
  const daysInterviews = state.days.filter(e => e.name === day)

  if (!daysInterviews[0]){
    return interviewerArr;
  }
  //loop daysInterviews & push all state.interviewers that match to interviewerArr
  for (let int of daysInterviews[0].interviewers) {
    interviewerArr.push(state.interviewers[int]);
    
  }
   
  return interviewerArr;
}
