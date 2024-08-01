"use client";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import LoginContext from "../hooks/login.context"; // Adjust the import path as needed
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
	title: "Urban Flavour",
	description: "Where Taste Meets Trend",
};

export default function RootLayout({ children }) {
	const path = usePathname();
	console.log(path);
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
		}
	};

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	return (
		<html lang="en">
			<head>
				<title>{metadata.title}</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="description" content={metadata.description} />
			</head>
			<LoginContext.Provider
				value={{ isUserLoggedIn, setIsUserLoggedIn, user, setUser }}>
				<body className={inter.className}>
					{!path.startsWith("/dashboard") && <Navbar />}
					{children}
					{!path.startsWith("/dashboard") && <Footer />}
				</body>
			</LoginContext.Provider>
		</html>
	);
}
