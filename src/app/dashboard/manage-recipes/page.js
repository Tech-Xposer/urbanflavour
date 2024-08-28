"use client";
import RecipeList from "@/components/RecipeList";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ManageRecipes = () => {
	const router = useRouter();
	const [recipes, setRecipes] = useState([]);
	const [categories, setCategories] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");

	const fetchRecipes = async () => {
		const response = await fetch("/api/v1/recipes");
		const data = await response.json();
		if (response.status === 200) {
			setRecipes(data.data.recipes);
			setFilteredRecipes(data.data.recipes);
		}
	};

	const fetchCategories = async () => {
		const response = await fetch("/api/v1/category");
		const data = await response.json();
		if (response.status === 200) {
			setCategories(data.data);
		}
	};

	const onCategoryChange = (event) => {
		const category = event.target.value;
		setSelectedCategory(category);
	};

	useEffect(() => {
		fetchRecipes();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (selectedCategory === "all") {
			setFilteredRecipes(recipes);
		} else {
			const filtered = recipes.filter(
				(recipe) => recipe.category.name === selectedCategory
			);
			setFilteredRecipes(filtered);
		}
	}, [selectedCategory, recipes]);

	const onDelete = async (id) => {
		const response = await fetch(`/api/v1/recipes/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (response.status === 200) {
			const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);

			setRecipes(updatedRecipes);
			setFilteredRecipes(updatedRecipes);
		}
	};

	const onView = (id) => {
		router.push(`/dashboard/manage-recipes/${id}`);
	};

	const onEdit = (recipe) => {
		router.push(`/dashboard/manage-recipes/${recipe._id}/edit`);
	};

	return (
		<div className="items-center justify-center p-4">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-3xl">All Recipes</h1>
				<section className="flex items-center space-x-2">
					<select
						onChange={onCategoryChange}
						value={selectedCategory}
						className="border border-gray-300 rounded p-2">
						<option value="all">All</option>
						{categories.map((category) => (
							<option key={category._id} value={category.name}>
								{category.name}
							</option>
						))}
					</select>
					<button
						onClick={() => router.push("/dashboard/manage-recipes/new")}
						className="bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded-md text-sm">
						New Recipe
					</button>
				</section>
			</div>
			<div className="mt-5">
				{filteredRecipes.length !== 0 &&
					filteredRecipes.map((recipe) => (
						<div key={recipe._id}>
							<RecipeList
								recipe={recipe}
								onDelete={onDelete}
								onView={onView}
								onEdit={onEdit}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default ManageRecipes;

/* 
dashboard
	manage-recipes
		page.js //show all recipes
		[id]
			page.js //view recipes
			edit
				page.js //edit recipes

 */
