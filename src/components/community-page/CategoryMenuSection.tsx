import {
  navigationMenuTriggerStyle,
  Carousel,
  CarouselContent,
  CarouselItem,
  cn,
} from '@/lib/index';

import { CategoryNameEnum as CategoryName, type CategoryId } from '@/api/index';
import { getCategoryIdByName } from '@/utils/index';
import { useCommunityQuery } from '@/hooks/index';
import { Sort } from '@/components/index';

const CategoryMenu = () => {
  const { queryState, updateCategory } = useCommunityQuery();

  const handleCategoryClick = (categoryId: CategoryId) => {
    updateCategory(categoryId);
  };

  return (
    <Carousel
      key="category-menu"
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {Object.values(CategoryName).map((category: CategoryName) => {
          const categoryId = getCategoryIdByName(category as CategoryName);
          const isActive =
            String(queryState.category_id || '') === String(categoryId);

          return (
            <CarouselItem key={category} className="basis-auto pl-1">
              <div
                className={cn(
                  navigationMenuTriggerStyle(),
                  'flex h-[42px] cursor-pointer items-center justify-center rounded-sm text-[16px] whitespace-nowrap',
                  isActive
                    ? 'text-oz-purple bg-oz-purple-light font-semibold'
                    : 'text-oz-gray-dark'
                )}
                onClick={() => handleCategoryClick(categoryId)}
              >
                {category}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

const CategoryMenuSection = () => {
  return (
    <>
      <section className="flex w-full items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <CategoryMenu />
        </div>
        <Sort />
      </section>
      <hr className="mb-5 w-full" />
    </>
  );
};

export default CategoryMenuSection;
