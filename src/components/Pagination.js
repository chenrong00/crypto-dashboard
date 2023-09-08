import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageRange = () => {
    const pagesToShow = 5; // Number of pages to show
    const middlePage = Math.floor(pagesToShow / 2);
    let startPage, endPage;

    if (currentPage <= middlePage) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + middlePage >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage;
      endPage = currentPage + middlePage;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        <li>
          <button
            className="px-3 py-2"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pageRange().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`px-3 py-2 ${
                currentPage === pageNumber ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-2"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
