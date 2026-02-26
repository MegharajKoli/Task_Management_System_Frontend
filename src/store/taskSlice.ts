import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import { taskService } from '../api/taskService';
import type { ITask, CreateTaskDTO, UpdateTaskDTO } from '../types';

interface TaskState {
  tasks: ITask[];
  currentTask: ITask | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  submitting: false,
};

// 1. FETCH ALL TASKS
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskService.getTasks();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

// 2. FETCH SINGLE TASK
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await taskService.getTaskById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch task');
    }
  }
);

// 3. CREATE TASK
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: CreateTaskDTO, { rejectWithValue }) => {
    try {
      const response = await taskService.createTask(taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task');
    }
  }
);

// 4. UPDATE TASK
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { id, updateData }: { id: string; updateData: UpdateTaskDTO },
    { rejectWithValue }
  ) => {
    try {
      const response = await taskService.updateTask(id, updateData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task');
    }
  }
);

// 5. DELETE TASK
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    clearError: (state) => {
      state.error = null;
    },
    setCurrentTask: (state, action: PayloadAction<ITask | null>) => {
      state.currentTask = action.payload;
    },
    resetTasks: (state) => {
      state.tasks = [];
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH TASKS
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // FETCH TASK BY ID
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTask = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE TASK
    builder
      .addCase(createTask.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.submitting = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    // UPDATE TASK
    builder
      .addCase(updateTask.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.submitting = false;
        const index = state.tasks.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    // DELETE TASK
    builder
      .addCase(deleteTask.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.submitting = false;
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
        if (state.currentTask?._id === action.payload) {
          state.currentTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentTask, resetTasks } = taskSlice.actions;
export default taskSlice.reducer;
