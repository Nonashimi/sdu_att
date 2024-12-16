"use client"

import { createSlice } from "@reduxjs/toolkit";

export interface sectionState {
  section: { title: string, href: string, choosed: boolean }[];
}
const sec = [{"title":"Home page","href":"/home/220107002","choosed":false},{"title":"Consent Requests","href":"/home/other","choosed":false},{"title":"Take attendance","href":"/home/take_attendance","choosed":true},{"title":"Wish list","href":"/home/other","choosed":false},{"title":"Withdrawals","href":"/home/other","choosed":false}];
const initialState: sectionState = {
  section: (() => {
    const storedSection = sec;
    try {
      return storedSection ? storedSection : [];
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
