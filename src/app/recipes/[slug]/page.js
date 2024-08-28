import RecipeDetailPage from "./recipe-page";

async function getRecipes(slug) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/recipes/slug/${slug}`,
		{
			credentials: "include",
		}
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data.data;
}

export async function generateMetadata({ params }) {
	const { slug } = params;
	const recipe = await getRecipes(slug);
	console.log(recipe);

	// Set the page title and description dynamically based on the recipe
	const pageTitle = recipe.recipe.title || "Urban Flavour"; // Fallback to a default title if recipe title is not available
	const pageDescription =
		recipe.recipe.description || "Where Taste Meet Trends"; // Fallback to a default description if recipe description is not available
	const pageImage = recipe.recipe.image || "/default-image.jpg"; // Fallback to a default image

	return {
		title: pageTitle,
		description: pageDescription,
		openGraph: {
			title: pageTitle,
			description: pageDescription,
			images: [
				{
					url: pageImage,
				},
			],
		},
	};
}

export default async function Page({ params }) {
	const { slug } = params;
	const recipe = await getRecipes(slug);
	return (
		<>
			<RecipeDetailPage recipe={recipe.recipe} comments={recipe.comments} />
		</>
	);
}
