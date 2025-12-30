import {
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  cn,
} from '@/lib/index';

import { CategoryName } from '@/api/communityTypes';
import { getCategoryIdByName } from '@/utils/index';
import { useCommunityQuery } from '@/hooks/index';

const CategoryMenu = () => {
  const { queryState, updateCategory } = useCommunityQuery();

  const handleCategoryClick = (categoryId: number) => {
    updateCategory(categoryId);
  };

  return (
    <Carousel key="category-menu">
      <CarouselPrevious />
      <CarouselContent>
        <NavigationMenuComponent className="w-full">
          <NavigationMenuList className="flex-wrap">
            {Object.values(CategoryName).map((category: CategoryName) => {
              const categoryId = getCategoryIdByName(category as CategoryName);
              const isActive = queryState.category_id === categoryId;

              return (
                <NavigationMenuItem key={category}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'h-[42px] cursor-pointer rounded-sm text-[16px]',
                      isActive
                        ? 'text-oz-purple bg-oz-purple-light font-semibold'
                        : 'text-oz-gray-dark'
                    )}
                    onClick={() => handleCategoryClick(categoryId)}
                  >
                    {category}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenuComponent>
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryMenu;
