import { axiosClient } from "./axiosClient";
import { valueWork } from "./../interface/interface";
const noteApi = {
	getAll() {
		const url: string = "/notes";
		return axiosClient.get(url);
	},

	add(note: valueWork) {
		const url: string = "/note-add";
		return axiosClient.post(url, note);
	},

	remove(id: string) {
		const url: string = `/note-remove/${id}`;
		return axiosClient.delete(url);
	},

	update(note: any) {
		const url: string = `/note-update/${note._id}`;
		return axiosClient.put(url, note);
	},
};

export default noteApi;
