// src/redux/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your real API endpoint
const NOTIFICATION_API = "http://localhost:8000/api/v1/notifications";

export const getAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${NOTIFICATION_API}/get`, {
        withCredentials: true,
      });
      return res.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${NOTIFICATION_API}/mark-all-read`, {}, {
        withCredentials: true,
      });
      return res.data.updatedNotifications;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
  },
});

export default notificationSlice.reducer;
