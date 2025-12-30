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

  const currentPage = queryState.page;
  const totalCount = postsQuery.data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // 표시할 페이지 번호 범위 계산 (useMemo로 최적화)
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    // 총 페이지 수가 최대 표시 가능 페이지 수보다 작거나 같으면 페이지 번호 배열 반환
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 최대 표시 가능 페이지 수의 절반 만큼 페이지 번호 범위 계산
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    // 현재 페이지에서 최대 표시 가능 페이지 수의 절반 만큼 빼서 시작 페이지 계산
    let startPage = Math.max(1, currentPage - halfVisible);
    // 현재 페이지에서 최대 표시 가능 페이지 수의 절반 만큼 더해서 끝 페이지 계산
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // 현재 페이지가 최대 표시 가능 페이지 수의 절반 만큼 작거나 같으면 시작 페이지를 1로 설정
    if (currentPage <= halfVisible) {
      endPage = MAX_VISIBLE_PAGES;
      startPage = 1;
    } else if (currentPage > totalPages - halfVisible) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages;
    }

    // 시작 페이지가 1보다 크면 1로 설정
    if (startPage > 1) {
      pages.push(1);
      // 시작 페이지가 2보다 크면 중간 페이지 표시
      if (startPage > 2) pages.push('ellipsis');
    }

    // 시작 페이지부터 끝 페이지까지 페이지 번호 배열 생성
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 끝 페이지가 총 페이지 수보다 작으면 중간 페이지 표시
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }
    // 페이지 번호 배열 반환
    return pages;
  }, [currentPage, totalPages]);

  // 페이지 번호 클릭 시 페이지 변경
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
