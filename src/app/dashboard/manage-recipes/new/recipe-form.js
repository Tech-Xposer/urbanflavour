"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";


const RecipeForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
	const [instructions, setInstructions] = useState([""]);
	const [prepTime, setPrepTime] = useState("");
	const [cookTime, setCookTime] = useState("");
	const [servings, setServings] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [categories, setCategories] = useState([]);
	const router = useRouter();

	const getCategories = async () => {
		try {
			const response = await fetch("/api/v1/category");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setCategories(data.data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleIngredientChange = (index, event) => {
		const values = [...ingredients];
		values[index][event.target.name] = event.target.value;
		setIngredients(values);
	};

	const handleAddIngredient = () => {
		setIngredients([...ingredients, { name: "", quantity: "" }]);
	};

	const handleRemoveIngredient = (index) => {
		const values = [...ingredients];
		values.splice(index, 1);
		setIngredients(values);
	};

	const handleInstructionChange = (index, event) => {
		const values = [...instructions];
		values[index] = event.target.value;
		setInstructions(values);
	};

	const handleAddInstruction = () => {
		setInstructions([...instructions, ""]);
	};

	const handleRemoveInstruction = (index) => {
		const values = [...instructions];
		values.splice(index, 1);
		setInstructions(values);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImage(file);
		setImageUrl(URL.createObjectURL(file));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("prepTime", prepTime);
		formData.append("cookTime", cookTime);
		formData.append("servings", servings);
		formData.append("category", category);
		formData.append("image", image);

		ingredients.forEach((ingredient, index) => {
			formData.append(`ingredients[${index}][name]`, ingredient.name);
			formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
		});

		instructions.forEach((instruction, index) => {
			formData.append(`instructions[${index}]`, instruction);
		});

		fetch("/api/v1/recipes/new", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	const handleReset = () => {
		setTitle("");
		setDescription("");
		setIngredients([{ name: "", quantity: "" }]);
		setInstructions([""]);
		setPrepTime("");
		setCookTime("");
		setServings("");
		setCategory("");
		setImage(null);
		setImageUrl("");
	};

	const handleBack = () => {
		router.back();
	};

	return (
		<div>
			<div>
            <button onClick={handleBack} className="flex bg-[#c7d2fe] text-indigo-800 rounded-md p-1 items-center w"><ChevronLeft/> Back</button>
				<h1 className="text-3xl font-bold text-center">Add New Recipe</h1>
			</div>
			<form
				onSubmit={handleSubmit}
				className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg animate__animated animate__fadeIn">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Ingredients
					</label>
					{ingredients.map((ingredient, index) => (
						<div
							key={index}
							className="flex items-center mb-2 animate__animated animate__fadeIn">
							<input
								type="text"
								name="name"
								value={ingredient.name}
								onChange={(event) => handleIngredientChange(index, event)}
								placeholder="Name"
								required
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
							/>
							<input
								type="text"
								name="quantity"
								value={ingredient.quantity}
								onChange={(event) => handleIngredientChange(index, event)}
								placeholder="Quantity"
								required
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
							/>
							<button
								type="button"
								onClick={() => handleRemoveIngredient(index)}
								className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300 ease-in-out">
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddIngredient}
						className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
						Add Ingredient
					</button>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Instructions
					</label>
					{instructions.map((instruction, index) => (
						<div
							key={index}
							className="flex items-center mb-2 animate__animated animate__fadeIn">
							<textarea
								value={instruction}
								onChange={(event) => handleInstructionChange(index, event)}
								placeholder={`Step ${index + 1}`}
								required
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
							/>
							<button
								type="button"
								onClick={() => handleRemoveInstruction(index)}
								className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300 ease-in-out">
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddInstruction}
						className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
						Add Instruction
					</button>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Prep Time (minutes)
					</label>
					<input
						type="number"
						value={prepTime}
						onChange={(e) => setPrepTime(e.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Cook Time (minutes)
					</label>
					<input
						type="number"
						value={cookTime}
						onChange={(e) => setCookTime(e.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Servings
					</label>
					<input
						type="number"
						value={servings}
						onChange={(e) => setServings(e.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Category
					</label>
					<select
						name="category"
						onChange={(e) => setCategory(e.target.value)}
						disabled={!categories.length}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
						<option value="">Select Category</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

			

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Image
					</label>
					<input
						type="file"
						onChange={handleImageChange}
						className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
					/>
					{imageUrl && (
						<img
							src={imageUrl}
							alt="Preview"
							className="mt-2 w-48 rounded-lg shadow-md"
						/>
					)}
				</div>

				<div className="flex justify-between">
				
					<button
						type="reset"
						onClick={handleReset}
						className="bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-yellow-700 transition duration-300 ease-in-out">
						Reset
					</button>
					<button
						type="submit"
						className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700 transition duration-300 ease-in-out">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default RecipeForm;
