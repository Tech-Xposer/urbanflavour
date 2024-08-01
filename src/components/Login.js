"use client";
import React, { useState } from "react";
import bg from "../assets/white_cueve_bg.png";
import axios from "axios";

const Login = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle login logic here
		const response = await axios.post(
			"/api/v1/auth/login",
			{ email, password },
			{ headers: { "Content-Type": "application/json" } }
		);

		console.log(response);

		if (response.ok) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
			<div className="bg-[#F7B104] p-8 rounded-lg shadow-lg  ">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold text-white">Login</h2>
					<button
						onClick={onClose}
						className="text-white hover:text-gray-200 transition text-2xl"
						aria-label="Close login modal">
						&times;
					</button>
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
						className="bg-[#F7B104] text-white  px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
						onClick={handleSubmit}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
