import { SortOption, SearchFilterEnum, type CategoryId } from '@/types/index';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { queryStateType } from '@/utils/index';

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
      );
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
    (search: string, search_filter?: SearchFilterEnum) => {
      const isSearchValid = !!search.trim();
      updateQuery({
        search: isSearchValid ? search : '',
        search_filter: isSearchValid
          ? search_filter || queryState.search_filter
          : undefined,
        page: 1,
      });
    },
    [updateQuery, queryState.search_filter]
  );

  const updateSearchFilter = useCallback(
    (search_filter?: SearchFilterEnum) => {
      updateQuery({
        search_filter,
      });
    },
    [updateQuery]
  );

  const updateCategory = useCallback(
    (category_id: CategoryId) => {
      updateQuery({
        category_id,
        page: 1,
      });
    },
    [updateQuery]
  );

  const updateSort = useCallback(
    (sort: SortOption) => {
      updateQuery({
        sort,
        page: 1,
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
