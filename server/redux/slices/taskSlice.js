import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks } from "../../../client/src/api/tasks/invokeGetTasks.api";
// import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks/index";


export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await getTasks();
    return res;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],       
    loading: false, 
  },

  reducers: {
    addTaskLocal(state, action) {
      state.list.push(action.payload);
    },

    updateTaskLocal(state, action) {
      const index = state.list.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },

    removeTaskLocal(state, action) {
      state.list = state.list.filter(t => t.id !== action.payload);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { addTaskLocal, updateTaskLocal, removeTaskLocal } = tasksSlice.actions;
export default tasksSlice.reducer;
