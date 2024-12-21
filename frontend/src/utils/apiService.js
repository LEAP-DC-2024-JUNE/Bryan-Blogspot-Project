import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:3001"
});

export const signup = async (data) => {
	const response = await api.post("/api/auth/signup", data);
	return response.data;
}

export const login = async (data) => {
	const response = await api.post("/api/auth/login", data);
	return response.data;
}
