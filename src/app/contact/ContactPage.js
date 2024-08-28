"use client"
import Image from "next/image";
import bg from "../../assets/customer-service.png";
import Accordion from "@/components/Accordion";
const ContactPage = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="text-5xl font-bold text-center gradient-text">
					Urban Flavour
				</h1>
				<p className="mt-2 text-center text-xl text-gray-600">
					A Curated Collection of Community-Crafted Recipes
				</p>
			</div>

			<div className="flex flex-col items-center justify-center md:flex-row">
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
							Contact Us
						</h2>

						<form className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700">
									Name
								</label>
								<div className="mt-1">
									<input
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700">
									Subject
								</label>
								<div className="mt-1">
									<input
										id="subject"
										name="subject"
										type="text"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700">
									Message
								</label>
								<div className="mt-1">
									<textarea
										id="message"
										name="message"
										rows="4"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"></textarea>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
									Submit
								</button>
							</div>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-gray-600">
								Developer: Ashutosh Sharma
							</p>
							<p className="text-sm text-gray-600">
								Website:{" "}
								<a href="https://codewithash.com" className="text-yellow-600">
									codewithash.com
								</a>
							</p>
							<p className="text-sm text-gray-600">
								LinkedIn:{" "}
								<a
									href="https://linkedin.com/in/asharma73"
									className="text-yellow-600">
									linkedin.com/in/asharma73
								</a>
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-center mt-12">
					<Image src={bg} alt="Customer Service" width={500} height={300} />
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Accordion
						title="How to Contribute"
						content="You can contribute to Urban Flavour by submitting your recipes, suggesting new features, or reporting bugs on our GitHub repository. Check out our contribution guidelines for more details."
					/>
					<Accordion
						title="How to Create an Account"
						content="Creating an account is simple and free. Just click on the 'Sign Up' button on the top right corner and fill out the required information."
					/>
					<Accordion
						title="Is it Safe to Use the App?"
						content="Yes, Urban Flavour follows industry-standard security practices to ensure your data is protected. We use encryption and other security measures to safeguard your information."
					/>
					<Accordion
						title="How to Contact the Developer"
						content="You can contact the developer directly through the contact form on this page or via the provided LinkedIn profile and website links."
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
