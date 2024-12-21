"use client";

import { useState } from "react";
import { login } from "@/utils/apiService";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { token } = await login(formData);
			localStorage.setItem("token", token);
			router.push("/");
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || "Something is wrong.");
		}
	};

	const handleChange = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value});
	};

	return (
		<div>
		  <form onSubmit={ handleSubmit }>
		    <h1>Login</h1>
		    <input
		      type="email"
		      name="email"
		      placeholder="Email"
		      value={ formData.email }
		      onChange={ handleChange }
		      required
		    />
		    <input
		      type="password"
		      name="password"
		      placeholder="Password"
		      value={ formData.password }
		      onChange={ handleChange }
		      required
		    />
		    <button type="submit">Login</button>
		    {error && <p>{error}</p>}
		  </form>
		</div>
	);
};

export default LoginPage;
