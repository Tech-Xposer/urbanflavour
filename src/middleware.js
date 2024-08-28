import { NextResponse } from "next/server";
import axios from "axios";

export const middleware = async (req) => {
	try {
		const url = req.nextUrl.clone();
		let token = req.cookies.get("accessToken");

		// Check if the token exists
		if (!token) {
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}

		// Attempt to fetch the current user with the token
		let response = await axios.get(
			`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/current-user`,
			{
				headers: {
					Authorization: `Bearer ${token.value}`,
					Cookie: req.headers.get("cookie"),
				},
				withCredentials: true,
			}
		);

		// If the token is expired or unauthorized, refresh the token
		if (response?.status === 401) {
			console.log("refreshing token");
			const refreshToken = req.cookies.get("refreshToken")?.value;
			if (refreshToken) {
				const newAccessToken = await refreshAccessToken(refreshToken);
				if (newAccessToken) {
					// Retry the request with the new access token
					response = await axios.get(
						`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/current-user`,
						{
							headers: {
								Authorization: `Bearer ${newAccessToken}`,
								Cookie: req.headers.get("cookie"),
							},
							withCredentials: true,
						}
					);

					// Update the access token in the response cookies if needed
					// (You might want to set this on the client side after successful login)
				} else {
					url.pathname = "/login";
					return NextResponse.redirect(url);
				}
			} else {
				url.pathname = "/login";
				return NextResponse.redirect(url);
			}
		}

		if (response?.status === 200) {
			return NextResponse.next();
		} else {
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	} catch (error) {
		console.error("Error during middleware authentication:", error.message);
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
};

export const config = {
	matcher: ["/dashboard/:path*"],
};
const refreshAccessToken = async (refreshToken) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/refresh-token`,
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
				withCredentials: true,
			}
		);

		if (response?.status === 200) {
			// Update the access token in the response cookies
			const newAccessToken = response.data.accessToken;
			return newAccessToken;
		} else {
			throw new Error("Failed to refresh access token");
		}
	} catch (error) {
		console.error("Error refreshing access token:", error.message);
		return null;
	}
};
