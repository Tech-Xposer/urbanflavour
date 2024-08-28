import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "January", desserts: 150, appetizers: 100, mainCourse: 200, beverages: 50 },
	{ month: "February", desserts: 180, appetizers: 120, mainCourse: 220, beverages: 60 },
	{ month: "March", desserts: 160, appetizers: 130, mainCourse: 240, beverages: 70 },
	// Add more monthly data...
];

const chartConfig = {
	desserts: {
		label: "Desserts",
		color: "#FFD700",
	},
	appetizers: {
		label: "Appetizers",
		color: "#FF4500",
	},
	mainCourse: {
		label: "Main Course",
		color: "#008000",
	},
	beverages: {
		label: "Beverages",
		color: "#1E90FF",
	},
};

export function CustomBarChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Traffic by Category - Bar Chart</CardTitle>
				<CardDescription>January - March 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 0,
						}}>
						<YAxis
							dataKey="month"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value}
						/>
						<XAxis dataKey="desserts" type="number" hide />
						<XAxis dataKey="appetizers" type="number" hide />
						<XAxis dataKey="mainCourse" type="number" hide />
						<XAxis dataKey="beverages" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="desserts" layout="vertical" radius={5} fill="#FFD700" />
						<Bar dataKey="appetizers" layout="vertical" radius={5} fill="#FF4500" />
						<Bar dataKey="mainCourse" layout="vertical" radius={5} fill="#008000" />
						<Bar dataKey="beverages" layout="vertical" radius={5} fill="#1E90FF" />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing traffic by category for the last 3 months
				</div>
			</CardFooter>
		</Card>
	);
}
