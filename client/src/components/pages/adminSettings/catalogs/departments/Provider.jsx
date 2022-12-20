// src/count-context.js
import React from 'react'

export const CustomStateContext = React.createContext()
export const CustomDispatchContext = React.createContext()


// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function CustomReducer(state, action) {
  switch (action.type) {
    case "selectRow": {
       return { ...state, currentRow: action.currentRow }
    }
    case "openCreateModal": {
       return { ...state, isShowCreateModal: true }
    }
    case "closeCreateModal": {
       return { ...state, isShowCreateModal: false }
    }
    case "openDeleteModal": {
       return { ...state, isShowDeleteModal: true }
    }
    case "closeDeleteModal": {
       return { ...state, isShowDeleteModal: false }
    }
    default: {
       throw new Error(`Unhandled action type: ${action.type}`)
    }
 }
}

// Инициализация
function createInitialState(){
   return {
      currentRow: null,
      isShowCreateModal: false,
      isShowDeleteModal: false,
   }
}


export function Provider({children}) {
   const [state, dispatch] = React.useReducer(CustomReducer,{},createInitialState)
   return (
      <CustomStateContext.Provider value={state}>
      <CustomDispatchContext.Provider value={dispatch}>
         {children}
      </CustomDispatchContext.Provider>
      </CustomStateContext.Provider>
   )
}
