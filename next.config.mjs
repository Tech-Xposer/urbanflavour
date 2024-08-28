/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dtsl8qkpd/image/upload/**",
			},
		],
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://urban-flavour.onrender.com/api/:path*",
			},
		];
	},
};

export default nextConfig;
