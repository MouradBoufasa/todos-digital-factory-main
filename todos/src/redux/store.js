import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../redux/todos';

export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
});
