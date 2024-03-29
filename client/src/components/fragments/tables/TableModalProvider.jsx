// src/count-context.js
import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function TableModalReducer(state, action) {
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

export function useTableModalsState() {
  const context = React.useContext(CustomStateContext);
  if (context === undefined) {
    throw new Error(
      'useCountState должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

export function useTableModalDispatch() {
  const context = React.useContext(CustomDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCountDispatch должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

export function TableModalProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    TableModalReducer,
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
