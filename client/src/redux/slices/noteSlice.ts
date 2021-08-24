import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../types/shape";
import noteApi from "./../../api/noteApi";

const initialState: any = {
	data: [],
	loading: false,
};

export const fetchData = createAsyncThunk("/fetch/todos", async () => {
	try {
		const { data } = await noteApi.getAll();
		return data;
	} catch (error) {}
});

export const addNote = createAsyncThunk("/add/todo", async (note: Todo) => {
	try {
		note.id = undefined;
		const { data } = await noteApi.add(note);
		return data;
	} catch (error) {}
});

export const removeNote = createAsyncThunk(
	"/remove/todo",
	async (id: string | number | undefined) => {
		const data = await noteApi.remove(id);
		if (data.status === 204) {
			return { id };
		}
	}
);

export const updateNote = createAsyncThunk("/update/todo", async (note: Todo) => {
	try {
		const { data } = await noteApi.update(note);
		console.log(data);
		return data;
	} catch (error) {}
});

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchData.pending.type]: (state, action) => {
			state.loading = true;
		},
		[fetchData.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.data = action.payload.items;
		},
		[addNote.fulfilled.type]: (state, action) => {
			state.data.push(action.payload);
		},
		[removeNote.fulfilled.type]: (state, action) => {
			state.data = state.data.filter((item: Todo) => item.id !== action.payload.id);
		},
		[updateNote.fulfilled.type]: (state, action) => {
			state.data = state.data.map((item: Todo) =>
				item.id === action.payload.id ? action.payload : item
			);
		},
	},
});

export default noteSlice.reducer;
