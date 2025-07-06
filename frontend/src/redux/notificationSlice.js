import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Correct base URL
const NOTIFICATION_API = "http://localhost:8000/api/v1/notifications";

// ✅ Fetch all notifications
export const getAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${NOTIFICATION_API}/get`, {
        withCredentials: true,
      });
      return res.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching notifications");
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/notifications/mark-all-as-read",
        {},
        { withCredentials: true }
      );
      return res.data.notifications; // or whatever you return from the backend
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ✅ Slice
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
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
  },
});

export default notificationSlice.reducer;
