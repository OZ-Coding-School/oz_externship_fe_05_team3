// import { Link } from 'react-router-dom';

// import {
//   NavigationMenu as NavigationMenuComponent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from '@/components/ui/navigation-menu';

// const CATEGORY_LIST = [
//   '전체',
//   '공지사항',
//   '자유 게시판',
//   '일상 공유',
//   '개발 지식 공유',
//   '취업 정보 공유',
//   '프로젝트 구인',
// ] as const;

// type Category = (typeof CATEGORY_LIST)[number];

// const LINK_STYLE = 'text-oz-gray-dark text-[16px]';

// export function NavigationMenu() {
//   return (
//     <NavigationMenuComponent className="w-full">
//       <NavigationMenuList className="flex-wrap">
//         {CATEGORY_LIST.map((category: Category) => (
//           <NavigationMenuItem key={category}>
//             <NavigationMenuLink
//               asChild
//               className={navigationMenuTriggerStyle()}
//             >
//               <Link
//                 className={LINK_STYLE}
//                 to={`/community?category=${category}`}
//               >
//                 {category}
//               </Link>
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenuComponent>
//   );
// }
