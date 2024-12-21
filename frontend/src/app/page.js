"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		router.refresh();
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	});
	return (
	  <div>
	    { isAuthenticated ? (
		<div>
		    <h1>You are logged in</h1>
		    <button onClick={ handleLogout }>Log out</button>
		</div>
	    ) : (
		<div>
		    <h1>You are not logged in</h1>
		    <button onClick={() => router.push("/login")}>Log in</button>
		</div>
	    )}
	  </div>
	);
};

export default Home;
