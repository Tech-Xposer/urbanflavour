"use client";
import 'animate.css';

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import Accordion from "../components/Accordion";

import img from "../assets/recipe-book.png";
import bg from "../assets/Recipe book-bro.png";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {

	const [recipes, setRecipes] = useState([]);

	
	useEffect(() => {
		getPopularRecipes();
	}, []);

	const getPopularRecipes = async () => {
		try {
			const response = await fetch("/api/v1/recipes/popular?limit=6");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setRecipes(data.data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
		}
	};

	return (
		<>
		
			<div className="bg-amber-50 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:gap-24">
					<Image
						src={img}
						alt="Recipe book"
						width={700}
						height={700}
						className="mt-8 lg:mt-0"
					/>
					<section className="text-left lg:mr-8">
						<h1 className="text-5xl font-bold gradient-text">
							Urban Flavour - <br /> Where Taste Meets Trend
						</h1>
						<p className="mt-4 text-lg text-gray-700 max-w-md">
							Join a community of urban food lovers and share your own culinary
							creations, tips, and experiences.
						</p>
						<div className="mt-6 flex">
							<button
								className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-lg mr-4 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500 transition-transform">
								How to Contribute?
							</button>
							<Link href="/recipes">
								<button className="bg-[#F7B104] text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-yellow-300 transition-transform">
									Explore Recipes
								</button>
							</Link>
						</div>
					</section>
				</div>


				<div className="py-16">
					<h2 className="text-3xl font-bold text-center mb-8">
						Featured Recipes
					</h2>

					<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{recipes.length === 0 ? (
							<div className="col-span-full text-center text-gray-700">
								No recipes found.
							</div>
						) : (
							recipes.map((recipe) => (
								<RecipeCard
									key={recipe._id}
									recipe={recipe.recipeInfo}
									rating={recipe.averageRating}
								/>
							))
						)}
					</div>
				</div>

				<div className="flex flex-col xl:flex-row">
					<div className="flex flex-col xl:flex-row">
						<div
							className="relative h-screen bg-cover bg-center"
							style={{ backgroundImage: `url(${bg})` }}>
							<div className="absolute inset-0 bg-black opacity-50"></div>
							<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
								<h1 className="text-5xl font-bold mb-4">
									Welcome to Urban Flavour
								</h1>
								<p className="text-lg mb-8">
									Discover and share amazing recipes from around the world.
								</p>
								<button className="px-6 py-3 bg-yellow-500 rounded-full font-semibold hover:bg-yellow-600 transition">
									Get Started
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-center text-gray-600 mb-8">
						Here are some common questions about Urban Flavour
					</p>
					<Accordion
						title="What is Urban Flavour?"
						content="Urban Flavour is a platform that provides a diverse range of food recipes catering to various tastes and occasions. Our goal is to inspire and help home cooks of all skill levels to create delicious meals."
					/>
					<Accordion
						title="How can I contribute a recipe?"
						content="You can contribute a recipe by joining our community and submitting your recipe through our contribution form. We welcome recipes from all culinary backgrounds."
					/>
					<Accordion
						title="What types of recipes are available?"
						content="Our platform offers a wide range of recipes, from quick weeknight dinners to elaborate holiday feasts. We cater to various dietary preferences and cuisines."
					/>
					<Accordion
						title="Can I share my recipes with others?"
						content="Yes, you can share your recipes with others. Our community is open and welcoming. We encourage you to join our community and share your creations with others."
					/>
					<Accordion
						title="What if I don't like a recipe?"
						content="If you don't like a recipe, you can report it. We appreciate your feedback and help improve our community. We value your feedback and suggestions."
					/>
				</div>
			</div>
		</>
	);
}
