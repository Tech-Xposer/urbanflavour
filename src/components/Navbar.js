"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Logo from "../assets/logo-lg.png";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import loginContext from "@/hooks/login.context";

const Navbar = () => {
	const path = usePathname();
	const [search, setSearch] = useState("");

	const navLinks = [
		{ name: "Home", to: "/" },
		{ name: "Recipes", to: "/recipes" },
		{ name: "About", to: "/about" },
		{ name: "Contact", to: "/contact" },
	];

	return (
		<div className="flex justify-between items-center p-2 bg-orange-50">
			<Image src={Logo} alt="logo" height={50} width={150} />
			<div className="flex gap-4">
				{navLinks.map((link) => (
					<Link
						href={link.to}
						key={link.name}
						className={`hover:text-orange-500 ${
							path === link.to ? "text-orange-400" : ""
						}`}>
						{link.name}
					</Link>
				))}
			</div>
			<div className="flex items-center gap-2">
				<div className="flex items-center border-[#F19F2D] border-2 rounded-lg p-2 bg-[#FEECDC] text-black">
					<Search className="mr-4" size={18} />
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search Recipes..."
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						className="bg-transparent placeholder-gray-400 focus:outline-none text-black"
					/>
				</div>
				<p className="cursor-pointer">
					<Link href="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Navbar;
