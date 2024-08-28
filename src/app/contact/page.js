import ContactPage from "./ContactPage";
export const generateMetadata = () => {
	return {
		title: "Contact Us - Urban Flavour",
		description:
			"Get in touch with us at Urban Flavour. We would love to hear from you and assist you with any queries or feedback.",
		keywords: "Contact, Urban Flavour, Food Recipes, Customer Support",
		author: "Urban Flavour",
		url: "https://www.urbanflavour.codewithash.blog/contact",
		image: "https://www.urbanflavour.codewithash.blog/static/contact-banner.jpg",
	};
};
export default function Contact() {

	return <ContactPage />;
}