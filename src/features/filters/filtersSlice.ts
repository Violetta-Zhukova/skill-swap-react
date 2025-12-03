import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Filters } from "../../entities/types";

type TFiltersState = {
  filters: Filters;
};

const initialState: TFiltersState = {
  filters: { mode: "all", gender: "no_matter", skillIds: [], cityIds: [] },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    reset: () => initialState,
  },
  selectors: {
    isNotEmptySelector: (state) =>
      state.filters.cityIds.length > 0 || state.filters.skillIds.length > 0,
  },
});

export const { setFilters, reset } = filtersSlice.actions;
export const { isNotEmptySelector } = filtersSlice.selectors;
export default filtersSlice.reducer;
