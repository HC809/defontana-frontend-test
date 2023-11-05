import { useCallback, useEffect, useState } from "react";
import { LIMIT } from "@/constants/pokeapi.constants";

const usePagination = (totalItems: number, searchTerm: string = "") => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setPage(1);
    setOffset(0);
  }, [searchTerm]);

  const totalPages = Math.ceil(totalItems / LIMIT);

  const goToNextPage = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
    setOffset((currentOffset) => currentOffset + LIMIT);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
    setOffset((currentOffset) => Math.max(0, currentOffset - LIMIT));
  }, []);

  return {
    page,
    offset,
    totalPages,
    goToNextPage,
    goToPrevPage,
  };
};

export default usePagination;
