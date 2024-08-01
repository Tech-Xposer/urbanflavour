import Head from "next/head";

const About = () => {
	return (
		<>
			<Head>
				<title>Urban Flavour - About Us</title>
				<meta
					name="description"
					content="Learn more about Urban Flavour, our mission, and the team behind the delicious recipes."
				/>
				<meta property="og:title" content="Urban Flavour - About Us" />
				<meta
					property="og:description"
					content="Learn more about Urban Flavour, our mission, and the team behind the delicious recipes."
				/>
				<meta property="og:image" content="/favicon-32x32.png" />{" "}
				{/* Adjust as needed */}
				<meta
					property="og:url"
					content="https://urbanflavour.codewithash.blog/about"
				/>
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div className="max-w-3xl mx-auto p-6">
				<h1 className="text-4xl font-bold mb-4">About Us</h1>
				<p className="text-lg mb-6">
					Welcome to <strong>Urban Flavour</strong>!
				</p>
				<p className="text-lg mb-6">
					At Urban Flavour, we're passionate about bringing you a diverse range
					of food recipes that cater to every taste and occasion. Our mission is
					to inspire and empower home cooks of all skill levels to create
					delicious, memorable meals in their own kitchens.
				</p>
				<h2 className="text-2xl font-semibold mt-8 mb-4">Who We Are</h2>
				<p className="text-lg mb-6">
					Urban Flavour is a vibrant community of food enthusiasts, culinary
					experts, and recipe developers dedicated to celebrating the art of
					cooking. Our team is driven by a shared love for food and a commitment
					to making cooking accessible and enjoyable for everyone. Whether
					you're a seasoned chef or a curious beginner, we're here to guide you
					on your culinary journey.
				</p>
				<h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
				<ul className="list-disc list-inside mb-6">
					<li className="text-lg mb-2">
						<strong>A Diverse Collection of Recipes:</strong> From quick
						weeknight dinners to elaborate weekend feasts, our curated
						collection of recipes caters to all tastes and dietary preferences.
						Explore everything from classic comfort foods to innovative,
						health-conscious dishes.
					</li>
					<li className="text-lg mb-2">
						<strong>User-Friendly Experience:</strong> Our platform is designed
						to make finding and following recipes a breeze. With
						easy-to-navigate categories, detailed instructions, and nutritional
						information, cooking has never been easier.
					</li>
					<li className="text-lg mb-2">
						<strong>Community and Inspiration:</strong> Join our growing
						community of food lovers. Share your culinary creations, exchange
						tips and tricks, and connect with others who share your passion for
						cooking.
					</li>
					<li className="text-lg mb-2">
						<strong>Expert Tips and Resources:</strong> Benefit from cooking
						tips, techniques, and kitchen hacks from our team of culinary
						experts. Our goal is to help you become more confident and skilled
						in the kitchen.
					</li>
				</ul>
				<h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
				<p className="text-lg mb-6">
					At Urban Flavour, we believe that cooking should be fun, creative, and
					rewarding. We're committed to providing high-quality content,
					fostering a supportive community, and continuously improving our
					platform based on your feedback. Your satisfaction and success in the
					kitchen are our top priorities.
				</p>
				<p className="text-lg">
					Thank you for being a part of Urban Flavour. We hope you enjoy
					exploring our recipes and find joy in every dish you create.
				</p>
				<p className="text-lg mt-4">Ashutosh Sharma</p>
			</div>
		</>
	);
};
export function generateMetadata({params}){
	return{
		title:'About - Urban Flavour'
	}
}

export default About;
