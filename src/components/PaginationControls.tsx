import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

const PaginationControls = React.memo(
  ({
    page,
    totalPages,
    goToNextPage,
    goToPrevPage,
  }: PaginationControlsProps) => {
    const showPrevButton = page > 1;
    const showNextButton = page < totalPages;

    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex justify-start w-24">
          {showPrevButton && (
            <button
              onClick={goToPrevPage}
              className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
          )}
        </div>
        <span className="flex-grow text-center mx-4">
          <span className="hidden sm:block">
            Página: {page} de {totalPages}
          </span>
          <span className="sm:hidden">
            Pág {page}/{totalPages}
          </span>
        </span>
        <div className="flex justify-end w-24">
          {showNextButton && (
            <button
              onClick={goToNextPage}
              className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default PaginationControls;
