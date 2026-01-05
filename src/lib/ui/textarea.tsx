import * as React from 'react';

import { cn } from '@/lib/index';

const Textarea = ({
  className,
  ...props
}: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'outline-oz-gray-light focus:outline-oz-purple border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-[120px] w-full max-w-[868px] rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] focus:outline-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
