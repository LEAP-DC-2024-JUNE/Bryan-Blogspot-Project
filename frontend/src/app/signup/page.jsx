"use client";

import { useState } from "react";
import { signup } from "@/utils/apiService.js";
import { useRouter } from "next/navigation";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signup(formData);
			router.push("/login");
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || "Something is wrong.");
		};
	};

	const handleChange = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value });
	};

	return (
		<div>
		  <form onSubmit={ handleSubmit }>
			<h1>Sign Up</h1>
			<input 
			  type="text"
			  name="name"
			  placeholder="Name"
			  value={ formData.name }
			  onChange={ handleChange }
			  required
			/>
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
			<input
			  type="password"
			  name="confirmPassword"
			  placeholder="Confirm Password"
			  value={ formData.confirmPassword }
			  onChange={ handleChange }
			  required
			/>
			<button type="submit">Sign up</button>
			{error && <p>{error}</p>}
		  </form>
		</div>
	);
};

export  default SignupPage;
