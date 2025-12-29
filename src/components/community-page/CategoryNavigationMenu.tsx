import { Link } from 'react-router';

import {
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/lib/index';

import { ROUTES } from '@/routes';
import { CategoryName } from '@/types-interface/CommunityTypes';
import { getCategoryIdByName } from '@/utils/Community';

const CategoryNavigationMenu = () => {
  return (
    <NavigationMenuComponent className="w-full">
      <NavigationMenuList className="flex-wrap">
        {Object.values(CategoryName).map((category: CategoryName) => {
          const categoryId = getCategoryIdByName(category as CategoryName);

          return (
            <NavigationMenuItem key={category}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  to={`${ROUTES.COMMUNITY}?category_id=${categoryId}`}
                  className="text-oz-gray-dark text-[16px]"
                >
                  {category}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenuComponent>
  );
};

export default CategoryNavigationMenu;
