"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

const RecipeList = ({ recipe, onView, onEdit, onDelete }) => {
	const createdAt = new Date(recipe.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const buttonRef = useRef(null);

	const handleView = () => {
		setMenuOpen(false);
		onView(recipe._id);
	};

	const handleEdit = () => {
		setMenuOpen(false);
		onEdit(recipe);
	};

	const handleDelete = () => {
		setMenuOpen(false);
		onDelete(recipe._id);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuRef]);

	return (
		<div className="flex items-center space-x-4 relative justify-center mt-4">
			<div className="relative w-20 h-16 overflow-hidden rounded-sm hover:scale-110 transition">
				<Image
					src={recipe?.imageUrl}
					alt={recipe?.title}
					layout="fill"
					objectFit="cover"
					className="rounded-md"
					title={recipe?.title}
				/>
			</div>
			<div className="flex-1">
				<h3 className="text-lg font-semibold">{recipe.title}</h3>
				<p className="text-sm text-gray-600">{recipe.description}</p>
			</div>
			<div className="relative flex items-center">
				<section>
					<p className="text-sm">{recipe?.author?.name}</p>
					<p className="text-sm">{createdAt}</p>
				</section>
				<button
					ref={buttonRef}
					onClick={() => setMenuOpen((prev) => !prev)}
					className="p-2 rounded-full hover:bg-gray-200">
					<MoreVertical />
				</button>
				{menuOpen && (
					<div
						ref={menuRef}
						className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
						<button
							onClick={handleView}
							className="block px-4 py-2 text-left w-full hover:bg-gray-100">
							View
						</button>
						<button
							onClick={handleEdit}
							className="block px-4 py-2 text-left w-full hover:bg-gray-100">
							Edit
						</button>
						<button
							onClick={handleDelete}
							className="block px-4 py-2 text-left w-full hover:bg-gray-100">
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipeList;
