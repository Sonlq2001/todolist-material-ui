import axiosClient from "./axiosClient";
import { Todo } from "../types/shape";
const noteApi = {
	getAll() {
		const url: string = "/api/todos";
		return axiosClient.get(url);
	},

	add(note: Todo) {
		const url: string = "/api/todos";
		return axiosClient.post(url, note);
	},

	remove(id: string | number | undefined) {
		const url: string = `/api/todos/${id}`;
		return axiosClient.delete(url);
	},

	update(note: Todo) {
		const url: string = `/api/todos/${note.id}`;
		return axiosClient.put(url, note);
	},
};

export default noteApi;
