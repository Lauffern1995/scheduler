import React from "react";

import Header from './Header'
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";

export default function Appointment(props)  {
 

  
  // ** MODES ** //
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';


  




  // saves Form data  and loads saving animation while bookInterview makes ajax call. Once completed will transition to SHOW mode
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
  
    
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
    
  }



  // deletes interviewListItem, loads deleting animation while cancelInterview makes ajax call. Once completed will transition to empty mode
  function deleteInterview() {
    
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
    
  }

  //loads confirm mode
   function cancelConfirmation() {
    transition(CONFIRM);
  }
 
  //loads edit mode
  function edit() {
    transition(EDIT);
  }





// check to see if interview is present. loads corresponding mode 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
      <article className="appointment">
  
      <Header time={props.time} />

      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}

      {mode === SHOW && 
        (<Show

        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={cancelConfirmation}
        onEdit={edit}
      
        />)}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === CREATE && 
      (<Form

        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        
      />)}


      {mode === CONFIRM &&
        <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={back}
        />}

      {mode === SAVING &&
        <Status
        message="SAVING..."
        />}


      {mode === DELETE &&
        <Status
         message="DELETING..."
        />}

      {mode === ERROR_SAVE && (
        <Error 
        message="OOPS! Could not save. Please try again." onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error 
        message="OOPS! Could not delete. Please try again." onClose={back}
        />
      )}

      </article>

  );


}