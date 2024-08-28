"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const EditRecipe = () => {
	const { id } = useParams();
	const router = useRouter();
	const [recipe, setRecipe] = useState({
		title: "",
		description: "",
		ingredients: [{ name: "", quantity: "" }],
		instructions: [""],
		prepTime: 0,
		cookTime: 0,
		servings: 0,
		category: "",
		imageUrl: "",
	});
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);
	0;

	const fetchRecipe = useCallback(async () => {
		if (!id) return;
		try {
			const response = await fetch(`/api/v1/recipes/${id}`);
			const data = await response.json();
			if (response.status === 200) {
				setRecipe(data.data.recipe);
			}
		} catch (error) {
			console.error("Failed to fetch recipe", error);
		} finally {
			setLoading(false);
		}
	}, [id]);

	const fetchCategories = useCallback(async () => {
		try {
			const response = await fetch("/≠≠api/v1/category");
			const data = await response.json();
			if (response.status === 200) {
				console.log(data);
				setCategories(data.data);
			}
		} catch (error) {
			console.error("Failed to fetch categories", error);
		}
	}, []);

	useEffect(() => {
		fetchRecipe();
		fetchCategories();
	}, [fetchRecipe, fetchCategories]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleIngredientChange = (index, e) => {
		const { name, value } = e.target;
		const newIngredients = [...recipe.ingredients];
		newIngredients[index][name] = value;
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const handleInstructionChange = (index, e) => {
		const newInstructions = [...recipe.instructions];
		newInstructions[index] = e.target.value;
		setRecipe({ ...recipe, instructions: newInstructions });
	};

	const handleAddIngredient = () => {
		setRecipe({
			...recipe,
			ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
		});
	};

	const handleRemoveIngredient = (index) => {
		const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const handleAddInstruction = () => {
		setRecipe({
			...recipe,
			instructions: [...recipe.instructions, ""],
		});
	};

	const handleRemoveInstruction = (index) => {
		const newInstructions = recipe.instructions.filter((_, i) => i !== index);
		setRecipe({ ...recipe, instructions: newInstructions });
	};

	const handleFileChange = (e) => {
		const file = event.target.files[0];
		setSelectedFile(file);

		file && setSelectedImageUrl(URL.createObjectURL(file));

		console.log(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (selectedFile) {
			formData.append("image", selectedFile);
		}
		formData.append("title", recipe.title);
		formData.append("description", recipe.description);
		formData.append("ingredients", JSON.stringify(recipe.ingredients));
		formData.append("instructions", JSON.stringify(recipe.instructions));
		formData.append("prepTime", recipe.prepTime);
		formData.append("cookTime", recipe.cookTime);
		formData.append("servings", recipe.servings);
		formData.append("category", recipe.category);

		try {
			const response = await fetch(`/api/v1/recipes/${id}`, {
				method: "PUT",
				body: formData,
			});
			if (response.status === 200) {
				router.push(`/dashboard/manage-recipes/${id}`);
			} else {
				const errorData = await response.json();
				console.error("Error updating recipe:", errorData.message);
			}
		} catch (error) {
			console.error("Failed to update recipe", error);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={recipe.title}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Description
					</label>
					<textarea
						name="description"
						value={recipe.description}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Prep Time (minutes)
					</label>
					<input
						type="number"
						name="prepTime"
						value={recipe.prepTime}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Cook Time (minutes)
					</label>
					<input
						type="number"
						name="cookTime"
						value={recipe.cookTime}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Servings
					</label>
					<input
						type="number"
						name="servings"
						value={recipe.servings}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Category
					</label>
					<select
						name="category"
						value={recipe.category}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Ingredients
					</label>
					{recipe.ingredients.map((ingredient, index) => (
						<div key={index} className="flex mb-2">
							<input
								type="text"
								name="name"
								value={ingredient.name}
								onChange={(e) => handleIngredientChange(index, e)}
								placeholder="Ingredient Name"
								className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
							/>
							<input
								type="text"
								name="quantity"
								value={ingredient.quantity}
								onChange={(e) => handleIngredientChange(index, e)}
								placeholder="Quantity"
								className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							<button
								type="button"
								onClick={() => handleRemoveIngredient(index)}
								className="ml-2 bg-red-500 text-white rounded px-2 py-1 focus:outline-none">
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddIngredient}
						className="mt-2 bg-blue-500 text-white rounded px-4 py-2 focus:outline-none">
						Add Ingredient
					</button>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Instructions
					</label>
					{recipe.instructions.map((instruction, index) => (
						<div key={index} className="flex mb-2">
							<textarea
								value={instruction}
								onChange={(e) => handleInstructionChange(index, e)}
								placeholder="Instruction"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							<button
								type="button"
								onClick={() => handleRemoveInstruction(index)}
								className="ml-2 bg-red-500 text-white rounded px-2 py-1 focus:outline-none">
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddInstruction}
						className="mt-2 bg-blue-500 text-white rounded px-4 py-2 focus:outline-none">
						Add Instruction
					</button>
				</div>
				<div className="mb-4 flex justify-between">
					{recipe.imageUrl && (
						<div>
							<p className="text-gray-700 text-xl font-bold mb-2">
								Current Image
							</p>
							<img
								src={`${recipe.imageUrl}`}
								alt="Recipe Image"
								className="mb-4 max-w-48"
							/>
						</div>
					)}
					{selectedFile && (
						<div className="max-w-48">
							<p className="text-gray-700 text-xl font-bold mb-2">
								Selected Image
							</p>
							<img
								src={selectedImageUrl}
								className="mb-4 max-w-48"
								alt="Selected Image"
							/>
						</div>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Image File
					</label>
					<input
						type="file"
						name="imageFile"
						onChange={handleFileChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex justify-between items-center">
					<button
						type="submit"
						className="bg-green-500 text-white rounded px-4 py-2 focus:outline-none">
						Update Recipe
					</button>
					<button
						type="c"
						className="bg-red-500 text-white rounded px-4 py-2 focus:outline-none"
						onClick={() => {
							router.back();
						}}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditRecipe;
