"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import loginContext from "@/hooks/login.context";
import { AlertDestructive } from "@/components/AlertBox";
import Image from "next/image";
import Link from "next/link";
import bg from "../../../assets/signup.png";

const Login = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
	const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
	const Router = useRouter();
	const { setIsUserLoggedIn, setUser } = useContext(loginContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email.length <= 8) {
			setAlertMessage("Please enter a valid email");
			setShowAlert(true);
			return;
		}

		try {
			const response = await axios.post(
				"/api/v1/auth/signup",
				{ email, password, name, phone },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				Router.push("/dashboard");
			} else {
				setAlertMessage("Login failed. Please try again.");
				setShowAlert(true);
			}
		} catch (error) {
			console.error("Error during login:", error);
			setAlertMessage(error.response.data.error);
			setShowAlert(true);
		}
	};

	// Hide alert after 3 seconds
	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showAlert]);

	return (
		<div className="flex items-center justify-center h-screen">
			{alertMessage && (
				<div
					className={`absolute bottom-5 right-5 w-fit transition-all duration-500 ${
						showAlert ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
					}`}>
					<AlertDestructive message={alertMessage} />
				</div>
			)}
			{/* Left side */}
			<div className="flex flex-col max-w-60 md:flex-row md:max-w-2xl shadow-xl md:h-96">
				<div className="flex flex-col bg-[#FBAF00] p-8 rounded-lg md:rounded-e-none shadow-lg items-center justify-center">
					<h1 className="text-2xl font-bold text-white text-center ">
						Create New Account
					</h1>

					{/* Display alert */}
					<form
						className="flex flex-col p-6 rounded-xl gap-4 text-sm items-center justify-center"
						onSubmit={handleSubmit}>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Enter your Full Name"
							className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 w-60"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
							className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 w-60"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="tel"
							name="phone"
							id="phone"
							placeholder="Enter your Phone Number"
							className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 w-60"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							className="p-2 rounded-lg focus:outline-none border-2 border-gray-300 w-60"
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="submit"
							className="text-black bg-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition">
							Signup
						</button>
					</form>
				</div>
				<div
					className="relative bg-cover bg-center w-[450px] h-full flex items-center justify-center bg-image hover:backdrop-blur-md"
					style={{ backgroundImage: `url(${bg.src})` }}>
					<Link
						href={"/login"}
						className="bg-[#F7B104] rounded-full px-4 py-2 text-white transition hover:bg-yellow-600 ">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
