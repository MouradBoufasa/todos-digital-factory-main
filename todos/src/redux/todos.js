import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (userId) => {
    try {
        const res = await axiosInstance.get(`todos?userId=${userId}`);
        return res.data;
    }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo, { dispatch, getState }) => {
    try {
        const res = await axiosInstance.patch(`/todos/${updatedTodo.id}`, updatedTodo);
        return res.data;
    }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        selectedTodo: {}
    },
    reducers: {
        selectTodo: (state, action) => { state.selectedTodo = action.payload }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updatedTodo = action.payload;
                const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
                if (index !== -1) {
                    state.todos[index] = updatedTodo;
                    state.selectedTodo = updatedTodo;
                }
            })
    }
});

export const { selectTodo } = todosSlice.actions;
export default todosSlice.reducer;