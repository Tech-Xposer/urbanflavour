import React, { useEffect, useState } from "react";

const RecipeForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
	const [instructions, setInstructions] = useState([""]);
	const [prepTime, setPrepTime] = useState("");
	const [cookTime, setCookTime] = useState("");
	const [servings, setServings] = useState("");
	const [category, setCategory] = useState("");
	const [author, setAuthor] = useState("");
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [categories, setCategories] = useState([]);

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
		formData.append("author", author);
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

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Description</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Ingredients</label>
				{ingredients.map((ingredient, index) => (
					<div key={index}>
						<input
							type="text"
							name="name"
							value={ingredient.name}
							onChange={(event) => handleIngredientChange(index, event)}
							placeholder="Name"
							required
						/>
						<input
							type="text"
							name="quantity"
							value={ingredient.quantity}
							onChange={(event) => handleIngredientChange(index, event)}
							placeholder="Quantity"
							required
						/>
						<button type="button" onClick={() => handleRemoveIngredient(index)}>
							Remove
						</button>
					</div>
				))}
				<button type="button" onClick={handleAddIngredient}>
					Add Ingredient
				</button>
			</div>

			<div>
				<label>Instructions</label>
				{instructions.map((instruction, index) => (
					<div key={index}>
						<textarea
							value={instruction}
							onChange={(event) => handleInstructionChange(index, event)}
							placeholder={`Step ${index + 1}`}
							required
						/>
						<button
							type="button"
							onClick={() => handleRemoveInstruction(index)}>
							Remove
						</button>
					</div>
				))}
				<button type="button" onClick={handleAddInstruction}>
					Add Instruction
				</button>
			</div>

			<div>
				<label>Prep Time (minutes)</label>
				<input
					type="number"
					value={prepTime}
					onChange={(e) => setPrepTime(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Cook Time (minutes)</label>
				<input
					type="number"
					value={cookTime}
					onChange={(e) => setCookTime(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Servings</label>
				<input
					type="number"
					value={servings}
					onChange={(e) => setServings(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Category</label>
				<select
					name="category"
					onChange={(e) => setCategory(e.target.value)}
					disabled={!categories.length}
					required>
					<option value="">Select Category</option>
					{categories.map((category) => (
						<option key={category._id} value={category._id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label>Author</label>
				<input
					type="text"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Image</label>
				<input type="file" onChange={handleImageChange} />
				{imageUrl && <img src={imageUrl} alt="Preview" width="200" />}
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default RecipeForm;
