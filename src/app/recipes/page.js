import RecipesPage from "./recipes";

const fetchRecipes = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/recipes`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data.data;
};

async function Recipes() {
	const { recipes } = await fetchRecipes();

	return <RecipesPage recipes={recipes} />;
}
export function generateMetadata() {
	return {
		title: "Recipes - Urban Flavour",
		description:
			"Explore a wide variety of delicious recipes on Urban Flavour. From appetizers to desserts, find the perfect recipe for any occasion.",
		openGraph: {
			title: "Recipes - Urban Flavour",
			description:
				"Explore a wide variety of delicious recipes on Urban Flavour. From appetizers to desserts, find the perfect recipe for any occasion.",
			url: `${process.env.NEXT_PUBLIC_HOST_URL}/recipes`,
			images: [
				{
					url: "/images/recipes-page.jpg",
					width: 800,
					height: 600,
					alt: "A variety of delicious dishes",
				},
			],
		},
	};
}

export default Recipes;
