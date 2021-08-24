import axiosClient from "./axiosClient";
import { AxiosResponse } from "axios";

import { ValueForm } from "../types/shape";

const authApi = {
	register(user: ValueForm): Promise<AxiosResponse> {
		const url: string = "/auth/register";
		return axiosClient.post(url, user);
	},

	login(user: ValueForm): Promise<AxiosResponse> {
		const url: string = "/auth/login";
		return axiosClient.post(url, user);
	},
};

export default authApi;
