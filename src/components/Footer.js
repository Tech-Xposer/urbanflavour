import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-8 w-[100%]">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-6 md:mb-0 text-center md:text-left">
						<h2 className="text-2xl font-bold mb-2">Urban Flavour</h2>
						<p className="text-gray-400">Delicious recipes at your fingertips.</p>
					</div>
					<div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
						<div>
							<h3 className="text-xl font-semibold mb-2">Quick Links</h3>
							<ul>
								<li>
									<Link href="/" className="text-gray-400 hover:text-white">
										Home
									</Link>
								</li>
								<li>
									<Link href="/about" className="text-gray-400 hover:text-white">
										About Us
									</Link>
								</li>
								<li>
									<Link href="/recipes" className="text-gray-400 hover:text-white">
										Recipes
									</Link>
								</li>
								<li>
									<Link href="/contact" className="text-gray-400 hover:text-white">
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold mb-2">Follow Us</h3>
							<div className="flex justify-center md:justify-start gap-4">
								<Link href="#" className="text-gray-400 hover:text-white">
									<Facebook size={24} />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Twitter size={24} />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Instagram size={24} />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Github size={24} />
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center text-gray-500">
					<p>&copy; {new Date().getFullYear()} Urban Flavour. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
