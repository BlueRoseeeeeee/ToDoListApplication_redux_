import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = "https://6700d49d4da5bd237554e76b.mockapi.io/todoList";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(url);
  return await response.json();
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTodo }),
  });
  return await response.json();
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedText }) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: updatedText }),
  });
  return await response.json();
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await fetch(`${url}/${id}`, { method: 'DELETE' });
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
