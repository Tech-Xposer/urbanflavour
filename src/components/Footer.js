import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="mb-6 md:mb-0">
						<h2 className="text-2xl font-bold mb-2">Urban Flavour</h2>
						<p className="text-gray-400">
							Delicious recipes at your fingertips.
						</p>
					</div>
					<div className="flex flex-col md:flex-row gap-8">
						<div>
							<h3 className="text-xl font-semibold mb-2">Quick Links</h3>
							<ul>
								<li>
									<Link href="/">
										<p className="text-gray-400 hover:text-white">Home</p>
									</Link>
								</li>
								<li>
									<Link href="/about">
										<p className="text-gray-400 hover:text-white">About Us</p>
									</Link>
								</li>
								<li>
									<Link href="/recipes">
										<p className="text-gray-400 hover:text-white">Recipes</p>
									</Link>
								</li>
								<li>
									<Link href="/contact">
										<p className="text-gray-400 hover:text-white">Contact</p>
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold mb-2">Follow Us</h3>
							<div className="flex gap-4">
								<a className="text-gray-400 hover:text-white">
									<Facebook size={24} />
								</a>

								<a className="text-gray-400 hover:text-white">
									<Twitter size={24} />
								</a>

								<a className="text-gray-400 hover:text-white">
									<Instagram size={24} />
								</a>

								<a className="text-gray-400 hover:text-white">
									<Github size={24} />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center text-gray-500">
					<p>
						&copy; {new Date().getFullYear()} Urban Flavour. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
