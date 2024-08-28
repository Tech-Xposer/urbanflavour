"use client";
import { ChevronLeft, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewRecipe = () => {
	const { id } = useParams();
	const router = useRouter();
	const [recipe, setRecipe] = useState(null);


	const fetchRecipe = async () => {
		if (!id) return;
		const response = await fetch(`/api/v1/recipes/${id}`);
		const data = await response.json();
		if (response.status === 200) {
			console.log(data.data.recipe);
			setRecipe(data.data.recipe);
		}
	};

	useEffect(() => {
		fetchRecipe();
	}, [id]);

	if (!recipe) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between">
				{" "}
				<button
					onClick={() => router.back()}
					className="flex bg-[#c7d2fe] text-indigo-800 rounded-md p-1 items-center ">
					<ChevronLeft /> Back
				</button>
				<button
					onClick={() =>
						router.push(`/dashboard/manage-recipes/${recipe._id}/edit`)
					}
					className="flex bg-[#c7d2fe] text-indigo-800 rounded-md px-2 items-center gap-1">
					<Pencil size={18} /> Edit
				</button>
			</div>
			<h1
				className="text-3xl font-bold mb-4 text-center"
				onClick={() => navigator.clipboard.writeText(recipe.title)}
				title="copy">
				{recipe.title}
			</h1>
			<p className="mb-4 text-center text-gray-600">{recipe.description}</p>
			<img
				src={`${recipe.imageUrl}`}
				alt={recipe.title}
				className="w-full h-60 mb-8 object-cover rounded-lg shadow-2xl"
				title={recipe.title}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
					<ul className="list-disc list-inside space-y-2">
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index} className="flex justify-between">
								<span>{ingredient.name}</span>
								<span className="font-semibold">{ingredient.quantity}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
					<ol className="list-decimal list-inside space-y-2">
						{recipe.instructions.map((instruction, index) => (
							<li key={index} className="mb-2">
								{instruction}
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default ViewRecipe;
