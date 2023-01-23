// src/count-context.js
import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function RouteStepFragmentReducer(state, action) {
  switch (action.type) {
    case "openConfirmModal_Confirm": {
      return {
        ...state,
        isOpen: true,
        modalType: "confirm",
        signatureTypeId: 1,
      };
    }
    case "closeModal": {
      return {
        ...state,
        isOpen: false,
        modalType: "",
        signatureTypeId: 0,
      };
    }
    case "openConfirmModal_ConfirmWithRemark": {
      return {
        ...state,
        isOpen: true,
        modalType: "confirmWithRemark",
        signatureTypeId: 3,
      };
    }
    case "openConfirmModal_RejectWithRemark": {
      return {
        ...state,
        isOpen: true,
        modalType: "rejectWithRemark",
        signatureTypeId: 2,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Инициализация
function createInitialState() {
  return {
    isOpen: false,
    modalType: "",
    signatureTypeId: 0,
    currentStepId: 0,
  };
}

export function useRouteStepFragmentState() {
  const context = React.useContext(CustomStateContext);
  if (context === undefined) {
    throw new Error(
      'useCountState должен вызываться внутри RouteStepFragmentProvider"а'
    );
  }
  return context;
}

export function useRouteStepFragmentDispatch() {
  const context = React.useContext(CustomDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCountDispatch должен вызываться внутри RouteStepFragmentProvider"а'
    );
  }
  return context;
}

export function RouteStepFragmentProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    RouteStepFragmentReducer,
    {},
    createInitialState
  );
  return (
    <CustomStateContext.Provider value={state}>
      <CustomDispatchContext.Provider value={dispatch}>
        {children}
      </CustomDispatchContext.Provider>
    </CustomStateContext.Provider>
  );
}