"use client";
import SideBar, { SidebarContext } from "@/components/Sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
	const [expanded, setExpanded] = useState(true);

	return (
		<SidebarContext.Provider value={{ expanded, setExpanded }}>
			<div className="flex">
				<SideBar />
				<main className={`flex-1 p-6 transition-all ${expanded ? 'ml-64' : 'ml-20'}`}>
					{children}
				</main>
			</div>
		</SidebarContext.Provider>
	);
};

export default DashboardLayout;
