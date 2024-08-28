"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import loginContext from "@/hooks/login.context";
import { AlertDestructive } from "@/components/AlertBox";
import Image from "next/image";
import Link from "next/link";
import bg from "../../../assets/recipe-book-amico.png";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
	const router = useRouter();
	const { setIsUserLoggedIn, setUser } = useContext(loginContext);

	const fetchCurrentUser = async () => {
		try {
			const response = await axios.get("/api/v1/auth/current-user", {
				withCredentials: true,
			});
			if (response.status === 200) {
				setIsUserLoggedIn(true);
				setUser(response.data.data.user);
			}
		} catch (error) {
			console.error("Error fetching current user:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email.length <= 8) {
			setAlertMessage("Please enter a valid email");
			return;
		}

		try {
			const response = await axios.post(
				"/api/v1/auth/login",
				{ email, password },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				await fetchCurrentUser();
				router.push("/dashboard");
			} else {
				setAlertMessage("Login failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			setAlertMessage(error.response.data.error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			{/* Left side */}
			<div className="flex flex-col max-w-60 md:flex-row md:max-w-2xl shadow-xl md:h-96">
				<div className="bg-white">
					<Image src={bg} alt="bg-image" />
				</div>
				<div className="flex flex-col bg-[#F7B104] p-8 rounded-lg shadow-lg items-center justify-center">
					<h1 className="text-3xl font-bold text-white">Login</h1>
					{alertMessage && <AlertDestructive message={alertMessage} />}{" "}
					{/* Display alert */}
					<form
						className="flex flex-col p-6 rounded-xl gap-4 text-sm items-center justify-center"
						onSubmit={handleSubmit}>
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
							className="text-[#F7B104] bg-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition">
							Login
						</button>
					</form>
					<Link href="/signup">
						<p className="text-white text-sm text-center cursor-pointer">
							Don't have an account? Sign up here
						</p>
					</Link>
					<h2 className="text-white ">OR</h2>
					<p className=" text-white text-sm text-center cursor-pointer">
						Forgot Your Password. Reset Here
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
