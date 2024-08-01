"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecipeCard = ({ recipe, rating }) => {
	// Generate an array of stars based on the rating
	const stars = Array.from({ length: 5 }, (_, index) => (
		<Star key={index} color={index < rating ? "#ffbb00" : "#e4e5e9"} />
	));

	// Construct image URL
	const imageUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${recipe.imageUrl}`;

	return (
		<div className="flex flex-col max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden group w-[500px]">
			<Link href={`/recipes/${recipe.slug}`}>
				<div className=" flex relative w-full items-center justify-center">
					<div className="relative overflow-hidden  rounded-xl mt-5">
						<img
							src={imageUrl || "/default-image.jpg"}
							alt={recipe?.title || "Recipe Image"}
							className="transition duration-300 ease-in-out hover:scale-110 w-[400px]  h-[250px] bg-center rounded-xl "
						/>
					</div>
				</div>
				<div className="p-4">
					<h1 className="text-2xl font-semibold mb-2">
						{recipe?.title || "Recipe Title"}
					</h1>
					<p className="text-base text-gray-600">
						{recipe?.description || "Recipe description goes here..."}
					</p>
					{rating && (
						<div className="flex items-center mt-4">
							<div className="flex items-center mr-5 gap-1">{stars}</div>
						</div>
					)}
				</div>
			</Link>
		</div>
	);
};

export default RecipeCard;
