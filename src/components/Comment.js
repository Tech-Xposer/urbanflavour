import React from "react";
import { Star } from "lucide-react";

const Comment = ({ comment }) => {
  // Generate an array of stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} color={index < comment.score ? "#ffbb00" : "#e4e5e9"} />
  ));

  return (
    <div className="border border-gray-200 p-4 rounded-lg mb-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">{comment.user.name}</span>
        <span className="text-sm text-gray-500">{comment.user.email}</span>
      </div>
      <div className="flex items-center mb-2">
        {stars}
      </div>
      <p className="text-gray-800">{comment.review}</p>
    </div>
  );
};

export default Comment;
