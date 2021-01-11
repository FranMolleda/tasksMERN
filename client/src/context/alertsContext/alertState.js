import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import alertContext from "./alertContext";

import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Funcion
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });

    //Pasados 2 segundos limpiamos la alerta
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 2000);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;