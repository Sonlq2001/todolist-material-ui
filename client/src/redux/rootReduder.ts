import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import noteReducer from "./slices/noteSlice";

const rootReducer = combineReducers({
	user: userReducer,
	note: noteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
