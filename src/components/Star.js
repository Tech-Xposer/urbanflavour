import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function Star() {
	const [rating, setRating] = useState(0);

	// Catch Rating value
	const handleRating = (rate) => {
		setRating(rate);
		// Other logic can be added here
	};

	return (
		<div className="flex justify-center items-center">
			<Rating
				fillColorArray={["#f14f45", "#f16c45", "#f18845", "#f1b345", "#f1d045"]}
				onClick={handleRating} // Use handleRating to capture clicks
				transition
				size={30} // Adjust size if necessary
				count={5}
				value={rating}
				edit={true}
				color={'#F19F2D'}
				activeColor={'#F19F2D'}
			/>
		</div>
	);
}

export default Star;
