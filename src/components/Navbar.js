"use client";
import Image from "next/image";
import React, { useState, useContext } from "react";
import Logo from "../assets/logo-lg.png";
import Link from "next/link";
import {
	Search,
	Menu,
	X,
	UserRound,
	Home,
	CookingPot,
	UsersRound,
	UserCircle2,
	PhoneCall,
	LogOut,
	ChartArea,
	LogIn,
	KeyRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import loginContext from "@/hooks/login.context";

const Navbar = () => {
	const path = usePathname();
	const router = useRouter();
	const { user, isUserLoggedIn, setIsUserLoggedIn, setUser } =
		useContext(loginContext);
	const [search, setSearch] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Home", to: "/", icon: <Home /> },
		{ name: "Recipes", to: "/recipes", icon: <CookingPot /> },
		{ name: "About", to: "/about", icon: <UsersRound /> },
		{ name: "Contact", to: "/contact", icon: <PhoneCall /> },
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const toggleAccountMenu = () => setIsAccountMenuOpen(!isAccountMenuOpen);
	const handleLogoutUser = async () => {
		const response = await fetch("/api/v1/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		if (response.status === 200) {
			setUser(null);
			setIsUserLoggedIn(false);
			router.push("/");
		}
	};
	return (
		<header className="bg-white p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Image src={Logo} alt="logo" height={50} width={150} />
				</div>
				<div className="hidden md:flex items-center justify-center flex-grow mx-4">
					<div className="flex items-center border-[#F19F2D] border-2 rounded-lg p-2 bg-[#FEECDC] text-black w-60">
						<Search className="mr-4" size={18} />

						<input
							type="text"
							name="search"
							id="search"
							placeholder="Search Recipes..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							className="bg-transparent placeholder-gray-400 focus:outline-none text-black w-full"
						/>
					</div>
				</div>
				<div className="flex absolute right-5 items-center md:hidden">
					<button className="text-gray-700 hover:text-orange-500 mr-2 flex items-center">
						<Search size={18} />
						<input
							type="text"
							name="search"
							id="search"
							placeholder="Search Recipes..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							className="bg-transparent placeholder-gray-400 focus:outline-none text-black w-full"
						/>
					</button>
					<button
						onClick={toggleMenu}
						className="text-gray-700 hover:text-orange-500 focus:outline-none">
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
				<div className="flex items-center">
					<nav
						className={`${
							isMenuOpen ? "block" : "hidden"
						} absolute top-16 left-0 w-full bg-orange-50 md:flex md:items-center  md:top-0 md:static md:w-auto md:bg-transparent md:p-0`}>
						<div className="flex flex-col md:flex-row md:gap-2">
							{navLinks.map((link) => (
								<Link
									href={link.to}
									key={link.name}
									className={`flex items-center gap-1 px-4 py-2 md:px-2 md:py-0 ${
										path === link.to
											? "text-orange-400"
											: "hover:text-orange-500"
									}`}
									onClick={() => setIsMenuOpen(false)}>
									{link.icon}
									{link.name}
								</Link>
							))}
						</div>
					</nav>
					<div className="relative hidden md:flex items-center">
						<button
							onClick={toggleAccountMenu}
							className="text-gray-700 hover:text-orange-500 focus:outline-none flex items-center">
							<span className="ml-2 flex items-center">
								<UserCircle2 size={24} />
								Account
							</span>
						</button>
						{isAccountMenuOpen && (
							<div className="absolute right-0 top-10 bg-white border border-gray-300 rounded-md shadow-lg">
								{isUserLoggedIn ? (
									<div>
										<div className="px-2 py-2 text-black flex items-center gap-2">
											<span className="bg-indigo-200 p-2 font-semibold text-indigo-800 rounded-full">
												{user?.name
													.split(" ")
													.map((word) => word[0].toUpperCase())
													.join("")}
											</span>
											<section>
												<p className="text-cl">{user.name}</p>
												<p className="text-sm text-gray-500">{user.email}</p>
											</section>
										</div>
										<Link
											href="/dashboard"
											className="block px-4 py-2 text-black hover:text-orange-500"
											onClick={() => setIsAccountMenuOpen(false)}>
											<ChartArea className="inline-block mr-2" size={18} />
											Dashboard
										</Link>
										<Link
											href="/change-password"
											className="block px-4 py-2 text-black hover:text-orange-500"
											onClick={() => setIsAccountMenuOpen(false)}>
											<KeyRound className="inline-block mr-2" size={18} />
											Change Password
										</Link>
										<button
											href="/logout"
											className="block px-4 py-2 text-black hover:text-orange-500"
											onClick={() => {
												handleLogoutUser();
												setIsAccountMenuOpen(false);
											}}>
											<LogOut className="inline-block mr-2" size={18} />
											Logout
										</button>
									</div>
								) : (
									<div>
										<Link
											href="/login"
											className="flex items-center px-4 py-2 text-black hover:text-orange-500"
											onClick={() => setIsAccountMenuOpen(false)}>
											<LogIn className="inline-block mr-2" size={16} />
											Login
										</Link>
										<Link
											href="/signup"
											className="flex items-center px-4 py-2 text-black hover:text-orange-500"
											onClick={() => setIsAccountMenuOpen(false)}>
											<UserRound className="inline-block mr-2" size={16} />
											Signup
										</Link>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
