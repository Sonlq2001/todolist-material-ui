import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./../../api/authApi";

export const userRegister = createAsyncThunk(
	"user/register",
	async ({ values: dataUser, history }: any, { rejectWithValue }) => {
		try {
			const { data } = await authApi.register(dataUser);
			history.push("/");
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.msg);
		}
	}
);

export const userLogin = createAsyncThunk(
	"/user/login",
	async ({ values: dataUser, history }: any, { rejectWithValue }) => {
		try {
			const { data } = await authApi.login(dataUser);
			history.push("/");
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.msg);
		}
	}
);

const initialState: any = {
	user: null,
	msg: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) {
			state.user = action.payload;
		},
		logout(state) {
			localStorage.removeItem("user");
			state.user = null;
		},
		getUser(state) {
			if (JSON.parse(localStorage.getItem("user") as any)) {
				state.user = JSON.parse(localStorage.getItem("user") as any);
			} else {
				state.user = null;
			}
		},
	},

	extraReducers: {
		[userRegister.pending.type]: (state, action) => {
			state.user = null;
		},

		[userRegister.fulfilled.type]: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},

		[userRegister.rejected.type]: (state, action) => {
			state.user = null;
			state.msg = action.payload;
		},

		[userLogin.fulfilled.type]: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},

		[userLogin.rejected.type]: (state, action) => {
			state.user = null;
			state.msg = action.payload;
		},
	},
});

export const { login, logout, getUser } = userSlice.actions;

const { reducer: userReducer } = userSlice;
export default userReducer;
