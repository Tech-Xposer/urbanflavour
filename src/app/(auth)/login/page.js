"use client";

import React, { useState } from "react";

import axios from "axios";
import bg from "../../../assets/white_cueve_bg.png";
import { useRouter } from "next/navigation";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const Router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"/api/v1/auth/login",
				{ email, password },
				{ headers: { "Content-Type": "application/json" } }
			);

			if (response.status === 200) {
				Router.push("/dashboard");
			} else {
				console.error("Login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="flex items-center justify-center bg-black">
			<div className="bg-[#F7B104] p-8 rounded-lg shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold text-white">Login</h2>
				</div>
				<div
					className="bg-cover bg-center flex flex-col p-6 rounded-xl gap-4 text-sm h-[54vh] items-center justify-center"
					style={{ backgroundImage: `url(${bg.src})` }}>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email"
						className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-gray-400"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-gray-400"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="bg-[#F7B104] text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
						onClick={handleSubmit}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
