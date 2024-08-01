/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8001', // optional
				pathname: '/uploads/**',
			},
			
		],
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8001/api/:path*", // Proxy to Backend
			},
		];
	},
};

export default nextConfig;
