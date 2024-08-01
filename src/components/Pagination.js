import React from "react";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        className="px-4 py-2 mx-1 bg-gray-200 rounded"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
      <button
        className="px-4 py-2 mx-1 bg-gray-200 rounded"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
