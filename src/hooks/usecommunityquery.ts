import { SortOption, SearchFilter } from '@/types-interface/index';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { queryState as queryStateType } from '@types-interface/CommunityTypes';
const useCommunityQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryState = queryStateType(searchParams);

  // URL 업데이트 헬퍼 ( 불필요한 파라미터 제거 )
  const updateQuery = useCallback(
    (updatedState: Partial<typeof queryState>) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          Object.entries(updatedState).forEach(([key, value]) => {
            if (value === undefined || value === '' || value === '전체') {
              newParams.delete(key);
            } else {
              newParams.set(key, String(value));
            }
          });
          return newParams;
        },
        { replace: false }
      ); // 히스토리 스택에 추가 ( false: 추가, true: 대체 )
    },
    [setSearchParams]
  );

  // 개별 업데이트 함수
  const updatePage = useCallback(
    (page: number) => {
      updateQuery({ page });
    },
    [updateQuery]
  );
  const updateSearch = useCallback(
    (search: string, search_filter?: SearchFilter) => {
      updateQuery({
        search,
        search_filter: search_filter || queryState.search_filter,
        page: 1, // 검색어 변경 시 페이지 초기화
      });
    },
    [updateQuery, queryState.search_filter]
  );

  //

  const updateSearchFilter = useCallback(
    (search_filter: SearchFilter) => {
      updateQuery({
        search_filter,
      });
    },
    [updateQuery]
  );

  const updateCategory = useCallback(
    //
    (category_id: number) => {
      updateQuery({
        category_id,
        page: 1, // 카테고리 변경 시 페이지 초기화
      });
    },
    [updateQuery]
  );

  const updateSort = useCallback(
    (sort: SortOption) => {
      updateQuery({
        sort,
        page: 1, // 정렬 변경 시 페이지 초기화
      });
    },
    [updateQuery]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    queryState,
    updatePage,
    updateSearch,
    updateSearchFilter,
    updateCategory,
    updateSort,
    resetFilters,
  };
};

export default useCommunityQuery;
