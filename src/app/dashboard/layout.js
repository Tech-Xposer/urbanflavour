"use client"
import SideBar from "@/components/sideBar";

import React from "react";

const DashboardLayout = ({ children }) => {
	return (
		<div className="flex">
			<SideBar />
			<main className="flex-1 p-6 md:ml-64">{children}</main>
		</div>
	);
};

export default DashboardLayout;
