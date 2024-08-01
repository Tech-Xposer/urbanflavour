import { NextResponse } from "next/server";

export const middleware = (req) => {
	const token = req.cookies.get("accessToken"); // Adjust this according to how you store your token
	const url = req.nextUrl.clone();

	if (!token) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
};

export const config = {
	matcher: ["/dashboard/:path*"],
};

const refreshAccesToken = async () => {
	const response = await fetch("/api/v1/auth/refresh-token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${refreshToken}`,
		},
		credentials: "include",
	});
};

const currentUser = async () => {
	const response = await fetch("/api/v1/auth/current-user", {
		credentials: "include",
	});

	return NextResponse.next();
};
