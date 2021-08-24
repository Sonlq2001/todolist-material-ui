import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./../../api/authApi";
import { ValueForm } from "./../../types/shape";

export const userRegister = createAsyncThunk(
	"user/register",
	async (values: ValueForm, { rejectWithValue }) => {
		try {
			const { data } = await authApi.register(values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const userLogin = createAsyncThunk(
	"/user/login",
	async (values: ValueForm, { rejectWithValue }) => {
		try {
			const { data } = await authApi.login(values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
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
			state.msg = "Đăng ký tài khoản thành công !";
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

export const { logout, getUser } = userSlice.actions;

const { reducer: userReducer } = userSlice;
export default userReducer;
