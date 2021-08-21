import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { valueWork } from "./../../interface/interface";
import noteApi from "./../../api/noteApi";

const initialState: any = {
	data: [],
	loading: false,
};

export const fetchData = createAsyncThunk("/fetch/note", async () => {
	try {
		const { data } = await noteApi.getAll();
		return data;
	} catch (error) {}
});

export const addNote = createAsyncThunk("/note/add", async (note: valueWork) => {
	try {
		note._id = undefined;
		const { data } = await noteApi.add(note);
		return data;
	} catch (error) {}
});

export const removeNote = createAsyncThunk("/note/remove", async (id: string) => {
	const { data } = await noteApi.remove(id);
	return data.noteDeleted;
});

export const updateNote = createAsyncThunk("/note/update", async (note: valueWork) => {
	try {
		const { data } = await noteApi.update(note);
		return data.note;
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
			state.data = action.payload;
		},
		[addNote.fulfilled.type]: (state, action) => {
			state.data.push(action.payload.note);
		},
		[removeNote.fulfilled.type]: (state, action) => {
			state.data = state.data.filter((item: any) => item._id !== action.payload._id);
		},
		[updateNote.fulfilled.type]: (state, action) => {
			state.data = state.data.map((item: any) =>
				item._id === action.payload._id ? action.payload : item
			);
		},
	},
});

export default noteSlice.reducer;
