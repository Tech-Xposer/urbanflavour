
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
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

const CustomPieChart = () => {
	const chartData = [
		{ category: "Desserts", visits: 500, fill: "#FFD700" },
		{ category: "Appetizers", visits: 300, fill: "#FF4500" },
		{ category: "Main Course", visits: 600, fill: "#008000" },
		{ category: "Beverages", visits: 150, fill: "#1E90FF" },
	];

	const chartConfig = {
		visits: {
			label: "Visits",
		},
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

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Category Traffic - Pie Chart</CardTitle>
				<CardDescription>Monthly Overview</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="visits" label nameKey="category" />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing visits by category for the current month
				</div>
			</CardFooter>
		</Card>
	);
};

export default CustomPieChart;

