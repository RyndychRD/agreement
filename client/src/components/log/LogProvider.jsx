// src/count-context.js
import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function LogReducer(state, action) {
  switch (action.type) {
    case "setLogTypes": {
      return { ...state, logTypes: action.logTypes };
    }
    case "setLogFunctions": {
      return { ...state, logFunctions: action.logFunctions };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useLogState() {
  return React.useContext(CustomStateContext);
}

export function useLogDispatch() {
  return React.useContext(CustomDispatchContext);
}

export function LogProvider({ children, logTypes, logFunctions }) {
  const [state, dispatch] = React.useReducer(LogReducer, {
    logTypes,
    logFunctions,
  });
  return (
    <CustomStateContext.Provider value={state}>
      <CustomDispatchContext.Provider value={dispatch}>
        {children}
      </CustomDispatchContext.Provider>
    </CustomStateContext.Provider>
  );
}
