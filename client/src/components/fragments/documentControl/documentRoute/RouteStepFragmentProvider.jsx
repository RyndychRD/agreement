// src/count-context.js
import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

// Это мета тип. На самом деле он будет использоваться как обозначение для удаления подследнего подписанного шага документа
export const SIGN_STEP_BACK_TYPE_ID = -1;

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function RouteStepFragmentReducer(state, action) {
  switch (action.type) {
    case "openConfirmModal_Confirm": {
      return {
        ...state,
        isOpenSigningModal: true,
        modalType: "confirm",
        signatureTypeId: 1,
      };
    }
    case "closeModal": {
      return {
        ...state,
        isOpenSigningModal: false,
        isOpenChangeStatusModal: false,
        modalType: "",
        signatureTypeId: 0,
        documentStatusId: 0,
      };
    }
    case "openConfirmModal_ConfirmWithRemark": {
      return {
        ...state,
        isOpenSigningModal: true,
        modalType: "confirmWithRemark",
        signatureTypeId: 3,
      };
    }
    case "openConfirmModal_RejectWithRemark": {
      return {
        ...state,
        isOpenSigningModal: true,
        modalType: "rejectWithRemark",
        signatureTypeId: 2,
      };
    }
    case "openConfirmModal_Reject": {
      return {
        ...state,
        isOpenChangeStatusModal: true,
        modalType: "reject",
        documentStatusId: 2,
      };
    }
    case "openConfirmModal_ReturnStepBack": {
      return {
        ...state,
        isOpenSigningModal: true,
        signatureTypeId: SIGN_STEP_BACK_TYPE_ID,
        modalType: "returnStepBack",
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
    isOpenSigningModal: false,
    isOpenChangeStatusModal: false,
    modalType: "",
    signatureTypeId: 0,
    documentStatusId: 0,
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
