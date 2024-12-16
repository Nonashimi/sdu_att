"use client"
import { createSlice } from "@reduxjs/toolkit";

export interface sectionState {
  section: { title: string, href: string, choosed: boolean }[];
}

const initialState: sectionState = {
  section: (() => {
    const storedSection = localStorage.getItem("section");
    try {
      return storedSection ? JSON.parse(storedSection) : [];
    } catch (e) {
      console.error("Failed to parse section from localStorage:", e);
      return [];
    }
  })(),
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    chooseOne: (state, action) => {
      state.section = state.section.map(s => ({ ...s, choosed: s.title === action.payload }));
      localStorage.setItem("section", JSON.stringify(state.section));
    },
  },
});

export const { chooseOne } = sectionSlice.actions;
export const sectionReducer = sectionSlice.reducer;
