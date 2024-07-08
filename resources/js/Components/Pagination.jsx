import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
    pageCount,
    pageRangeDisplayed = 5, // Nombre de pages affichées à la fois
    previousLabel,
    nextLabel,
    onClick,
    currentPage,
}) => {
    const pages = [...Array(pageCount).keys()].map((number) => number + 1);

    // Calcul des pages à afficher dans la pagination par blocs
    const startIndex = Math.max(0, currentPage - Math.floor(pageRangeDisplayed / 2));
    const endIndex = Math.min(pageCount - 1, startIndex + pageRangeDisplayed - 1);

    const visiblePages = pages.slice(startIndex, endIndex + 1);

    return (
        <div className="flex items-center space-x-1 border border-gray-300 bg-gray-100 rounded-lg p-2 shadow-md">
            <button
                onClick={() => onClick({ isPrevious: true })}
                disabled={currentPage === 0}
                className={`p-2 ${currentPage === 0 ? "text-gray-400" : "text-gray-700"}`}
            >
                {previousLabel}
            </button>
            {visiblePages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => onClick({ index: page - 1 })}
                    className={`p-2 ${currentPage === page - 1 ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-primary-700 hover:text-white"} ${currentPage === page - 1 ? "font-bold rounded-full bg-gray-300" : "rounded-full"}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onClick({ isNext: true })}
                disabled={currentPage === pageCount - 1}
                className={`p-2 ${currentPage === pageCount - 1 ? "text-gray-400" : "text-gray-700"}`}
            >
                {nextLabel}
            </button>
        </div>
    );
};

export default Pagination;
