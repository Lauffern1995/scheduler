


export function getAppointmentsForDay(state, day) {

  const appointments = [];
    
  const daysAppointments = state.days.filter(e => e.name === day)

  if (!daysAppointments[0]){
    return appointments;
  }

  for (let appt of daysAppointments[0].appointments) {
    appointments.push(state.appointments[appt]);
    
  }
  
  return appointments;
}




export function getInterview(state, interview) {

  const interviewObj = {}

  if(!interview){
    return null
  }

  interviewObj.student = interview.student
  interviewObj.interviewer = state.interviewers[interview.interviewer]

 return interviewObj;

}



export function getInterviewersForDay(state, day) {

   const interviewerArr = [];
    
  const daysInterviews = state.days.filter(e => e.name === day)

  if (!daysInterviews[0]){
    return interviewerArr;
  }

  for (let int of daysInterviews[0].interviewers) {
    interviewerArr.push(state.interviewers[int]);
    
  }
   
  return interviewerArr;
}
