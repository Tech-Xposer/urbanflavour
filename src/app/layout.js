"use client";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import LoginContext from "../hooks/login.context"; // Adjust the import path as needed
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { AlertDestructive } from "@/components/AlertBox";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	const path = usePathname();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [user, setUser] = useState({});

	const fetchCurrentUser = async () => {
		const response = await fetch("/api/v1/auth/current-user", {
			credentials: "include",
		});
		const data = await response.json();
		if (response.status === 200) {
			setIsUserLoggedIn(true);
			setUser(data.data.user);
		} else {
			setIsUserLoggedIn(false);
			setUser(null);
			<AlertDestructive
				message={" Your session has expired. Please log in again."}
			/>;
		}
	};

	useEffect(() => {
		// Fetch current user
		fetchCurrentUser();
	}, []);

	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<LoginContext.Provider
				value={{ isUserLoggedIn, setIsUserLoggedIn, user, setUser }}>
				<body className={inter.className}>
					{!path.startsWith("/dashboard")  && <Navbar />}
					{children}
					{!path.startsWith("/dashboard") && <Footer />}
				</body>
			</LoginContext.Provider>
		</html>
	);
}
