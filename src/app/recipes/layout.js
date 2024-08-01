import React from "react";

export const metadata = {
	title: "Recipes",
};

const layout = ({ children }) => {
	return <div className="w-5/6">{children}</div>;
};

export default layout;
