"use client";
import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import RecipeCard from "@/components/RecipeCard";
import Spinner from "@/components/Spinner";

const RecipesPage = ({ recipes }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const recipesPerPage = 12;

	// Calculate total pages
	const totalPages = Math.ceil(recipes.length / recipesPerPage);

	// Calculate current recipes
	const indexOfLastRecipe = currentPage * recipesPerPage;
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
	const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

	// Pagination handler
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="p-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold mb-2">Our Recipes</h1>
					<h2 className="text-xl font-medium mb-6 text-gray-700">
						Discover and enjoy a variety of delicious recipes crafted for every taste and occasion.
					</h2>
				</div>
				{recipes.length === 0 ? (
					<Spinner />
				) : (
					<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{currentRecipes.length === 0 ? (
							<div className="col-span-full text-center text-gray-700">
								No recipes found.
							</div>
						) : (
							currentRecipes.map((recipe) => (
								<RecipeCard key={recipe._id} recipe={recipe} rating={recipe.rating} />
							))
						)}
					</div>
				)}
			</div>
			<Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
		</>
	);
};

export default RecipesPage;
