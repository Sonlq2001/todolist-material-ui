import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
	baseURL: "https://todo-mvc-api-typeorm.herokuapp.com",
	headers: { "Content-Type": "application/json" },
});

const { token } = JSON.parse(localStorage.getItem("user") as string) || {};

axiosClient.interceptors.request.use((req: AxiosRequestConfig) => {
	req.params = req.params || {};
	if (token) {
		req.headers.Authorization = `Bearer ${token}`;
	}

	return req;
});

axiosClient.interceptors.response.use((res: AxiosResponse) => {
	return res;
});

export default axiosClient;
