"use client";

import Pagination from "@/components/Pagination";
import RecipeCard from "@/components/RecipeCard";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";



const Recipes = () => {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const searchParams = useSearchParams();
	const currentPage = searchParams.get("page") || 1;
	const [totalPages, setTotalPages] = useState(0);

	const fetchRecipes = async () => {
		try {
			const response = await fetch("/api/v1/recipes");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setRecipes(data.data.recipes);
			setTotalPages(Math.round(data.data.length / 9));
			setLoading(false);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, []); // Empty dependency array ensures this runs once on mount

	if (loading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Spinner />
			</div>
		);

	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<Head>
				<title>Urban Flavour - Recipes</title>
				<meta
					name="description"
					content="Explore a variety of delicious recipes on Urban Flavour. Find recipes that suit your taste and dietary preferences."
				/>
				<meta property="og:title" content="Urban Flavour - Recipes" />
				<meta
					property="og:description"
					content="Explore a variety of delicious recipes on Urban Flavour. Find recipes that suit your taste and dietary preferences."
				/>
				<meta property="og:image" content="/favicon-32x32.png" />{" "}
				{/* Adjust as needed */}
				<meta
					property="og:url"
					content="https://urbanflavour.codewithash.blog/recipes"
				/>
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div className="p-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold mb-2">Our Recipes</h1>
					<h2 className="text-xl font-medium mb-6 text-gray-700">
						Discover and enjoy a variety of delicious recipes crafted for every
						taste and occasion.
					</h2>
				</div>
				{recipes.length === 0 ? (
					<Spinner />
				) : (
					<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{recipes.length === 0 ? (
							<div className="col-span-full text-center text-gray-700">
								No recipes found.
							</div>
						) : (
							recipes.map((recipe) => (
								<RecipeCard
									key={recipe._id}
									recipe={recipe}
									rating={recipe.rating}
								/>
							))
						)}
					</div>
				)}
			</div>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</>
	);
};

export default Recipes;
