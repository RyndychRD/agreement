/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Первым значением обязательно должно быть MainModal. В ней вводится название и выбирается тип договора
  // Подразумевается, что изначально есть только MainModal. Потом массив заполняется фактическим маршрутом при выборе типа документа. Пока что это не реализовано
  pipelineModals: [
    { modal: "MainModal", json: {} },
    { modal: "FormConstruct", json: {} },
    { modal: "FormFill", json: {} },
    // { modal: "RouteConstruct", json: {} },
    { modal: "DocumentPreview" },
  ],
  currentModal: 0,
};

export const getCurrentStep = (state) =>
  state.documentCreation.pipelineModals[state.documentCreation.currentModal];
export const getCurrentStepModal = (state) => getCurrentStep(state).modal;
export const getCurrentStepJson = (state) => getCurrentStep(state).json;
export const getFirstStepJson = (state) =>
  state.documentCreation.pipelineModals[0].json;
export const getPreviousStepJson = (state) =>
  state.documentCreation.pipelineModals[state.documentCreation.currentModal - 1]
    .json;
export const getSteps = (state) => state.documentCreation.pipelineModals;

export const documentCreationSlice = createSlice({
  name: "documentCreation",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentModal += 1;
    },
    setStep: (state, action) => {
      state.currentModal = action.payload;
    },
    saveCurrentStepJson: (state, action) => {
      state.pipelineModals[state.currentModal].json = action.payload;
    },
    clearDocumentCreation: (state) => {
      state.currentModal = initialState.currentModal;
      state.pipelineModals = initialState.pipelineModals;
    },
  },
});

export const { clearDocumentCreation, nextStep, setStep, saveCurrentStepJson } =
  documentCreationSlice.actions;

export default documentCreationSlice.reducer;
