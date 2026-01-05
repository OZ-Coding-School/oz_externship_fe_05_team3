import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/index';

const loadingVariants = cva(
  'animate-spin rounded-full border-solid border-t-transparent border-oz-purple',
  {
    variants: {
      size: {
        sm: 'size-4 border-2',
        md: 'size-8 border-[3px]',
        lg: 'size-12 border-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const Loading = ({
  className,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof loadingVariants>) => {
  return (
    <div
      data-slot="loading"
      className={cn(loadingVariants({ size }), className)}
      {...props}
    />
  );
};

export default Loading;
