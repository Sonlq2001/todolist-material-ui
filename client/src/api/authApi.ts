import { axiosClient } from "./axiosClient";

import { valueFormRegister } from "./../interface/interface";

const authApi = {
	register(user: valueFormRegister) {
		const url: string = "/register";
		return axiosClient.post(url, user);
	},

	login(user: valueFormRegister) {
		const url: string = "/login";
		return axiosClient.post(url, user);
	},
};

export default authApi;
