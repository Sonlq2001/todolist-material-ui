import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import noteReducer from "./slices/noteSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		note: noteReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
