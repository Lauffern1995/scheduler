


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