import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingMessage: "",
  reportId: null,
  report: null,
  reports: [],
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoadingMessage(state, action) {
      state.loadingMessage = action.payload;
    },
    setReportId(state, action) {
      state.reportId = action.payload;
    },
    setReport(state, action) {
      state.report = action.payload;
    },
    setReports(state, action) {
      state.reports = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearAIState(state) {
      state.loading = false;
      state.loadingMessage = "";
      state.reportId = null;
      state.report = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setLoadingMessage,
  setReportId,
  setReport,
  setReports,
  setError,
  clearAIState,
} = aiSlice.actions;

export default aiSlice.reducer;