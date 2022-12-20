// src/count-context.js
import React from 'react'

const CustomStateContext = React.createContext()
const CustomDispatchContext = React.createContext()


// Описание редукторов
// (каких либо действий если мы не хотим светиться в редаксе)
function CustomReducer(state, action) {
   switch (action.type) {
      case "selectRow": {
         return { ...state, currentRow: action.currentRow }
      }
      case "openCreateModal": {
      return { ...state, isShowCreateModal: true };
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

export function useCustomState() {
   const context = React.useContext(CustomStateContext)
   if (context === undefined) {
      throw new Error('useCountState должен вызываться внутри Provider"а от Cерого')
   }
   return context
   }

export function useCustomDispatch() {
   const context = React.useContext(CustomDispatchContext)
   if (context === undefined) {
      throw new Error('useCountDispatch должен вызываться внутри Provider"а от Cерого')
   }
   return context
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
