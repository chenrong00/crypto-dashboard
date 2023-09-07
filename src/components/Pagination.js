import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [
    ...Array(nPages + 1)
      .keys()
      .slice(1),
  ];
}
