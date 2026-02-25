import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IComment,  CreateCommentDTO } from '../types';
import { commentService } from '../api/commentService';

interface CommentState {
  comments :IComment[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  submitting: false,
};



// 2. FETCH Comments By TaskId
export const fetchCommentsByTaskId = createAsyncThunk(
  'comments/fetchcommentsByTaskId',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await commentService.getCommentsByTask(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

// 3. CREATE comment
export const createComment = createAsyncThunk(
  'tasks/createComment',
  async (
    payload: { id: string; commentData: CreateCommentDTO },
    { rejectWithValue }
  ) => {
    try {
      const response = await commentService.addComment(payload.id, payload.commentData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);


// 5. DELETE Comment
export const deleteComment = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await commentService.deleteComment(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete Comment');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    
    clearError: (state) => {
      state.error = null;
    },
    resetComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
  

    // FETCH TASK BY ID
    builder
      .addCase(fetchCommentsByTaskId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCommentsByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE TASK
    builder
      .addCase(createComment.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.submitting = false;
        if (action.payload && typeof action.payload === 'object' && '_id' in action.payload) {
          state.comments.push(action.payload as IComment);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

   

    // DELETE Comment
    builder
      .addCase(deleteComment.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.comments = state.comments.filter(t => t._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;
