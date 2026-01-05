import { useMemo, useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/lib/index';
import { useCommunityQuery, useCommunityPageData } from '@/hooks/index';

const PAGE_SIZE = 10;
const MAX_VISIBLE_PAGES = 5;

const CommunityPagination = () => {
  const { queryState, updatePage } = useCommunityQuery();
  const { postsQuery } = useCommunityPageData();
  // 백엔드 response
  // posts : postsQuery.data.result

  const currentPage = queryState.page;
  const totalCount = postsQuery.data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = MAX_VISIBLE_PAGES;
      startPage = 1;
    } else if (currentPage > totalPages - halfVisible) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages;
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        updatePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [totalPages, updatePage]
  );

  // 이전 페이지 존재 여부
  const hasPrevious = currentPage > 1;
  // 다음 페이지 존재 여부
  const hasNext = currentPage < totalPages;

  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 페이지네이션 컴포넌트 반환
  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => hasPrevious && handlePageChange(currentPage - 1)}
            size="sm"
            className={
              !hasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
            aria-disabled={!hasPrevious}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                size="sm"
                aria-current={currentPage === page ? 'page' : undefined}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            onClick={() => hasNext && handlePageChange(currentPage + 1)}
            size="sm"
            className={
              !hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
            aria-disabled={!hasNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CommunityPagination;
