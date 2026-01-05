// import { ListCard } from '@/components/CommunityPage/ListCard';
// import { NavigationMenu } from '@/components/CommunityPage/NavigationMenu';
// import { CreateButton } from '@/components/CommunityPage/CreateButton';
// import { CommunityPagination } from '@/components/CommunityPage/Pagination';
// import { ArrayOption } from '@/components/CommunityPage/ArrayOption';
// import { postList } from '@/mocks/postList';
// import { Link, useSearchParams } from 'react-router-dom';
// import { useMemo, useState, type KeyboardEvent } from 'react';

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from '@/components/ui/input-group';
// import { SearchIcon } from 'lucide-react';
// import { useCommunityPosts } from '@/hooks/usecommunityposts';
// import { useCommunityQuery } from '@/hooks/usecommunityquery';
// import {
//   CommunitySearchSort,
//   CommunitySearchFilter,
// } from '@/api/model/postDTO';

// function CommunityPage() {
//   const { queryState } = useCommunityQuery();

//   const postsQuery = useCommunityPosts({
//     page: queryState.page,
//     search: queryState.search,
//     search_filter: queryState.search_filter,
//     sort: queryState.sort,
//   });

//   const posts = postsQuery.data ?? [];

//   const searchFilter = [
//     { value: CommunitySearchFilter.AUTHOR, label: '작성자' },
//     { value: CommunitySearchFilter.TITLE, label: '제목' },
//     { value: CommunitySearchFilter.CONTENT, label: '내용' },
//     { value: CommunitySearchFilter.TITLE_OR_CONTENT, label: '제목 또는 내용' },
//   ];

//   const handleChangeSearchFilter = (filter: string) => {
//     console.log('searchfilter :', filter);
//   };
//   const handleChangeSearch = (search: string) => {
//     console.log('search :', search);
//   };

//   return (
//     <div className="mx-auto mt-25 mb-50 flex w-[960px] flex-col items-center gap-4 px-4">
//       <header className="mx-auto flex w-full flex-col gap-4">
//         <p className="text-[32px] font-bold">커뮤니티</p>

//         <section className="mb-10 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <Select onValueChange={handleChangeSearchFilter}>
//               <SelectTrigger className="w-[120px] text-[16px]">
//                 <SelectValue placeholder="검색 유형" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup className="">
//                   <SelectLabel>검색 유형</SelectLabel>
//                   {searchFilter.map((filter) => (
//                     <SelectItem key={filter.value} value={filter.value}>
//                       {filter.label}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             <InputGroup className="h-[48px] w-[472px] rounded-full">
//               <InputGroupInput
//                 className="text-[14px]"
//                 placeholder="질문검색"
//                 onChange={(event) => handleChangeSearch(event.target.value)}
//               />
//               <InputGroupAddon>
//                 <SearchIcon />
//               </InputGroupAddon>
//             </InputGroup>
//           </div>
//           <div>
//             <CreateButton />
//           </div>
//         </section>

//         <section className="flex items-center justify-between gap-4">
//           <div>
//             <NavigationMenu />
//           </div>
//           <div>
//             <ArrayOption />
//           </div>
//         </section>
//         <hr />
//       </header>

//       <main className="mb-10 flex flex-col gap-4">
//         {posts?.results?.map((post) => (
//           <Link to={`/community/${post.id}`} key={post.id}>
//             <ListCard post={post} category={post.category} />
//           </Link>
//         ))}
//         <hr />
//       </main>

//       <footer className="flex justify-center">
//         <CommunityPagination />
//       </footer>
//     </div>
//   );
// }

// export default CommunityPage;
