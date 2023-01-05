import React from "react";

const CustomStateContext = React.createContext();
const CustomDispatchContext = React.createContext();

export function useCustomState() {
  const context = React.useContext(CustomStateContext);
  if (context === undefined) {
    throw new Error(
      'useCountState должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

export function useCustomDispatch() {
  const context = React.useContext(CustomDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCountDispatch должен вызываться внутри Provider"а от Cерого'
    );
  }
  return context;
}

// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function CustomReducer(state, action) {
  switch (action.type) {
    // Кнопка "Сохранить форму"
    // FormBuilder => App => CollectionCreateForm => CustomInput => Component => onFinish => dispatch({ type: "Build", FormBuilderData: value })
    case "SaveFormButton": {
      console.log(
        "FormBuilder => App => CollectionCreateForm => CustomInput => Component => onFinish => dispatch({ type: 'Build', FormBuilderData: value })"
      );
      console.log("Old snapshot", state, "=>", "New snapshot", {
        ...state,
        FormBuilderData: action.FormBuilderData,
      });
      return { ...state, FormBuilderData: action.FormBuilderData };
    }
    case "CancelButton": {
      console.log(
        "FormBuilder => App => CollectionCreateForm => onCancel => dispatch({ type: 'CancelButton'})"
      );
      console.log("Old snapshot", state, "=>", "New snapshot", {});
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Инициализация
function createInitialState() {
  return {
    FormBuilderData: {},
  };
}

export function Provider({ children }) {
  const [state, dispatch] = React.useReducer(
    CustomReducer,
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
