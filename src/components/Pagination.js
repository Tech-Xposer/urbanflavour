import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
	return (
		<div className="flex justify-between m-10">
			<button
				className="px-4 py-2 mx-1 bg-gray-200 rounded"
				onClick={() => paginate(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Prev
			</button>
			<span className="px-4 py-2 mx-1">
				{currentPage} / {totalPages}
			</span>
			<button
				className="px-4 py-2 mx-1 bg-gray-200 rounded"
				onClick={() => paginate(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
