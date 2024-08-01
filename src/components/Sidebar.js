"use client";
import {
	MoreVertical,
	ChevronLeft,
	ChevronRight,
	ChartColumnStacked,
	LucideCookingPot,
	ChartArea,
	UsersRound,
	Settings2,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import loginContext from "@/hooks/login.context";
import Link from "next/link";
import logo from "../assets/logo-lg.png";
import Image from "next/image";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
	const currentPath = usePathname();
	const [expanded, setExpanded] = useState(true);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const router = useRouter();
	const { user } = useContext(loginContext);
	const userInitials = user?.name
		? user.name
				.split(" ")
				.map((name) => name[0].toUpperCase())
				.filter((_, index, arr) => index === 0 || index === arr.length - 1)
				.join("")
		: "";

	const showMoreDetails = () => {
		console.log("user pane");
	};

	const navLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
			icon: <ChartColumnStacked className="text-2xl text-gray-600  " />,
		},
		{
			name: "Recipes",
			link: "/dashboard/manage-recipes",
			icon: <LucideCookingPot className="text-2xl text-gray-600  " />,
		},
		{
			name: "Analytics",
			link: "/dashboard/analytics",
			icon: <ChartArea className="text-2xl text-gray-600  " />,
		},
		{
			name: "Users",
			link: "/dashboard/manage-users",
			icon: <UsersRound className="text-2xl text-gray-600  " />,
		},
		{
			name: "Settings",
			link: "/dashboard/settings",
			icon: <Settings2 className="text-2xl text-gray-600  " />,
		},
	];

	const handleLogoutUser = async () => {
		const response = await fetch("/api/v1/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
			},
			credentials: "include",
		});
		if (response.status === 200) {
			router.push("/");
		}
	};

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white border-r shadow-2xl rounded-r-2xl">
				<div className="p-4 pb-2 flex justify-between items-center">
					<Image
						src={logo}
						className={`overflow-hidden transition-all ${
							expanded ? "w-32" : "w-0"
						}`}
						alt=""
					/>
					<button
						onClick={() => setExpanded((curr) => !curr)}
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
						{expanded ? <ChevronLeft /> : <ChevronRight />}
					</button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">
						{navLinks.map((link, index) => (
							<Link href={link.link} key={index}>
								<SidebarItem
									icon={link.icon}
									text={link.name}
									active={currentPath === link.link}
								/>
							</Link>
						))}
						{children}
					</ul>
				</SidebarContext.Provider>

				<div className="border-t flex p-3 items-center justify-center">
					<span className=" rounded-md bg-[#c7d2fe]  p-2">{userInitials}</span>
					<div
						className={`flex justify-between items-center overflow-hidden transition-all ${
							expanded ? "w-52 ml-3" : "w-0"
						}`}>
						<div className="leading-4">
							<h4 className="font-semibold">{user.name}</h4>
							<span className="text-xs text-gray-600">{user.email}</span>
						</div>
						<MoreVertical
							size={20}
							onClick={() => setShowUserMenu((prev) => !prev)}
							className="cursor-pointer"
						/>
					</div>
					{showUserMenu && (
						<div className="absolute bottom-12 left-0 bg-gray-100 shadow-lg rounded-md p-3 w-48">
							<button
								onClick={handleLogoutUser}
								className="w-full text-right px-2 py-1 hover:bg-gray-100 rounded-md">
								Logout
							</button>
						</div>
					)}
				</div>
			</nav>
		</aside>
	);
}

function SidebarItem({ icon, text, active, alert }) {
	const { expanded } = useContext(SidebarContext);

	return (
		<li
			className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
				active
					? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
					: "hover:bg-indigo-50 text-gray-600"
			}`}>
			{icon}
			<span
				className={`overflow-hidden transition-all ${
					expanded ? "w-52 ml-3" : "w-0"
				}`}>
				{text}
			</span>
			{alert && (
				<div
					className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
						expanded ? "" : "top-2"
					}`}
				/>
			)}

			{!expanded && (
				<div
					className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
					{text}
				</div>
			)}
		</li>
	);
}

//#C7D2FE
