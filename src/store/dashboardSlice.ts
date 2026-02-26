import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TaskReport } from '../types';
import { reportService } from '../api/reportService';

interface UserState {
  report: TaskReport | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  report: null,
  loading: false,
  error: null,
};


// 1. FETCH Report
export const fetchReport = createAsyncThunk(
  'report/tasks/fetchReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportService.getTaskReport();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch Report');
    }
  }
);


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH Report
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
