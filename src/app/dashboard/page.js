"use client";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import NewRecipeButon from "@/components/NewRecipeButton";

export function Component() {
	return (
		<Card className='w-96'>
			<CardHeader className="pb-2">
				<CardDescription>Total Recipes</CardDescription>
				<CardTitle className="text-4xl">6</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">+25% from last week</div>
			</CardContent>
			<CardFooter>
				<Progress value={25} aria-label="25% increase" />
			</CardFooter>
		</Card>
	);
}

export default function AdminDashboard() {
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
			<section className="flex gap-5  items-center">
				<Component />
				<NewRecipeButon />
			</section>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">

				<Link href="/dashboard/manage-recipes">
					<p className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
						Manage Recipes
					</p>
				</Link>
			</div>
		</div>
	);
}
export function Metadata() {
	return {
		title: "Admin Dashboard",
	};
}
