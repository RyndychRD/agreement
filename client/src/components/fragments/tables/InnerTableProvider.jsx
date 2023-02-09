// src/count-context.js
import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function InnerTableModalReducer(state, action) {
  switch (action.type) {
    case "selectRow": {
      return { ...state, currentRow: action.currentRow };
    }
    case "openCreateModal": {
      return {
        ...state,
        isShowCreateModal: true,
        isShowDeleteModal: false,
        isShowUpdateModal: false,
      };
    }
    case "closeAllModal": {
      return {
        ...state,
        isShowCreateModal: false,
        isShowDeleteModal: false,
        isShowUpdateModal: false,
        currentRow: null,
      };
    }
    case "openDeleteModal": {
      return {
        ...state,
        isShowDeleteModal: true,
        isShowCreateModal: false,
        isShowUpdateModal: false,
      };
    }
    case "openUpdateModal": {
      return {
        ...state,
        isShowUpdateModal: true,
        isShowCreateModal: false,
        isShowDeleteModal: false,
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
    currentRow: null,
    isShowCreateModal: false,
    isShowDeleteModal: false,
    isShowUpdateModal: false,
  };
}

export function useInnerTableState() {
  const context = React.useContext(CustomStateContext);
  if (context === undefined) {
    throw new Error(
      'useCountState должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

export function useInnerTableDispatch() {
  const context = React.useContext(CustomDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCountDispatch должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

export function InnerTableModalProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    InnerTableModalReducer,
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
