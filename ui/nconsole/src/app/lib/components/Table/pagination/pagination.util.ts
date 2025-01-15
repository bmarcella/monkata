export interface PaginationRange {
  start: number;
  end: number;
  current: number;
  total: number;
  pages: number[];
}

export function generatePaginationRange(
  currentPage: number,
  totalPages: number
): PaginationRange {
  let start: number;
  let end: number;

  if (currentPage <= 10) {
    // For pages 1-10, show regular sequence
    start = Math.max(1, currentPage - 2);
    end = Math.min(totalPages, currentPage + 2);
  } else {
    // For pages over 10, count by 5
    start = Math.floor(currentPage / 5) * 5;
    if (start === currentPage) {
      start = currentPage - 5;
    }
    end = Math.min(start + 10, totalPages);
    
    // Ensure we always show the current page
    if (currentPage > end) {
      start = currentPage - 5;
      end = Math.min(currentPage + 5, totalPages);
    }
  }

  // Generate the array of page numbers
  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  ).filter(page => page > 0 && page <= totalPages);

  return {
    start,
    end,
    current: currentPage,
    total: totalPages,
    pages
  };
}