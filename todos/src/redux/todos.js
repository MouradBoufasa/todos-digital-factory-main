import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (user) => {
    try {
        const res = await axiosInstance.get(`todos?userId=${user.id}`);
        if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
    try {
        const updatedTodo = { ...todo, completed: true };
        const res = await axiosInstance.patch(`/todos/${todo.id}`, updatedTodo);
        console.log(res.data)
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
        // .addCase(updateTodo.fulfilled, (state, action) => {
        //     state.todos = action.payload
        // })
    }
});

export const { selectTodo } = todosSlice.actions;
export default todosSlice.reducer;