"use client";

import { CustomBarChart } from "@/components/BarChart";
import CustomPieChart from "@/components/PieChart";

export default function Analytics() {
  
	return (
		<div className="flex items-center justify-between">
			<div className="">
				<CustomPieChart />
			</div>
			<div className="">
				<CustomBarChart />
			</div>
		</div>
	);
}
