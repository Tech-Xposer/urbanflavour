"use client";

import Comment from "@/components/Comment";
import Spinner from "@/components/Spinner";
import Star from "@/components/Star";
import { Clock } from "lucide-react";
import Head from "next/head";

import { useEffect, useState } from "react";

const RecipeDetailPage = ({ params }) => {
	const { slug } = params;
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await fetch(`/api/v1/recipes/slug/${slug}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setRecipe(data.data.recipe);
				setComments(data.data.comments);
				setLoading(false);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [slug]);

	if (loading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Spinner />
			</div>
		);
	if (error) return <div>Error: {error}</div>;

	const createdAt = new Date(recipe.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const pageTitle = `${recipe?.title} - Recipe Details`;
	const pageDescription = `Learn how to make ${recipe?.title}. Find the ingredients, instructions, and more.`;

	return (
		<>
			<Head>
				<title>{recipe.title}</title>
				<meta name="description" content={pageDescription} />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={pageDescription} />
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${recipe?.imageUrl}`}
				/>
				<meta property="og:type" content="article" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={pageTitle} />
				<meta name="twitter:description" content={pageDescription} />
				<meta
					name="twitter:image"
					content={`${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${recipe?.imageUrl}`}
				/>
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Recipe",
						name: recipe?.title,
						image: `${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${recipe?.imageUrl}`,
						author: {
							"@type": "Person",
							name: recipe?.author?.name || "anonymous",
						},
						datePublished: recipe?.createdAt,
						description: pageDescription,
						recipeIngredient: recipe?.ingredients?.map(
							(ingredient) => `${ingredient.quantity} ${ingredient.name}`
						),
						recipeInstructions: recipe?.instructions?.map((step, index) => ({
							"@type": "HowToStep",
							text: step,
							name: `Step ${index + 1}`,
						})),
						aggregateRating: {
							"@type": "AggregateRating",
							ratingValue: comments?.length
								? (
										comments.reduce((acc, curr) => acc + curr.stars, 0) /
										comments.length
								  ).toFixed(1)
								: "0",
							reviewCount: comments?.length.toString(),
						},
						review: comments?.map((comment) => ({
							"@type": "Review",
							author: {
								"@type": "Person",
								name: comment.user.name,
							},
							datePublished: new Date().toISOString(),
							reviewBody: comment.review,
							reviewRating: {
								"@type": "Rating",
								ratingValue: comment.stars,
							},
						})),
					})}
				</script>
			</Head>
			<div className="bg-orange-50 p-6">

				<div className="max-w-5xl mx-auto">
					{recipe?.imageUrl && (
						<div className="relative w-full h-64 mb-4">
							<img
								src={`${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${recipe.imageUrl}`}
								alt={recipe?.title || "Recipe Image"}
								className="object-cover w-full h-full rounded-lg"
							/>
						</div>
					)}
					<h1 className="text-4xl font-bold mb-4 text-center text-orange-600">
						{recipe?.title}
					</h1>
					<div className="flex justify-between text-gray-700 mb-4">
						<section className="flex gap-3">
							<span>{recipe?.author?.name || "anonymous"}</span>
							<span>&#x26AC;</span>
							<span>{createdAt}</span>
						</section>
						<section className="flex items-center">
							<Clock size={16} className="mr-1" />
							{recipe.prepTime + recipe.cookTime}
							{" Min"}
						</section>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2">
							<h2 className="text-2xl font-semibold mb-4">Instructions</h2>
							<div>
								{recipe?.instructions?.map((step, index) => (
									<div key={index} className="mb-4">
										<h3 className="text-xl font-medium">Step {index + 1}</h3>
										<p>{step}</p>
									</div>
								))}
							</div>
							<h2 className="text-2xl font-semibold mt-6 mb-4">
								Recipe Notes:
							</h2>
							<ul className="list-disc pl-5">
								{recipe?.notes?.map((note, index) => (
									<li key={index}>{note}</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
							<ul className="list-none">
								{recipe?.ingredients?.map((ingredient, index) => (
									<li key={index} className="flex justify-between">
										<span>{ingredient.name}</span>
										<span>{ingredient.quantity}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="mt-8">
						<h2 className="text-2xl font-semibold mb-4">Comments</h2>
						<div>
							{comments?.map((comment, index) => (
								<Comment comment={comment} key={index} />
							))}
						</div>
						<Star />
						<form className="mt-4">
							<div className="mb-4">
								<label className="block text-gray-700 mb-2" htmlFor="comment">
									Add a comment
								</label>
								<textarea
									id="comment"
									className="w-full p-2 border border-gray-300 rounded"
									rows="4"></textarea>
							</div>
							<button
								type="submit"
								className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecipeDetailPage;
