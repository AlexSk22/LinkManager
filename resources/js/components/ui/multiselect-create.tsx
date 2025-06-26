import { forwardRef } from 'react';
import { Props as ReactSelectProps, GroupBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';

export type MultiSelectProps<
  Option,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, 'theme' | 'classNames'> & {
  error?: boolean;
};

export const MultiSelectCreate = forwardRef<any, MultiSelectProps<any>>(({ className, error, ...props }, ref) => {
  return (
    <CreatableSelect
      ref={ref}
      isMulti
      unstyled
      closeMenuOnSelect={false}
      className={className}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            'flex w-[255px] !min-h-0 rounded-lg border border-input bg-background px-3 py-[3px] text-sm shadow-sm transition-colors',
            'placeholder:text-muted-foreground focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isFocused && 'ring-1 ring-ring',
            error && 'border-destructive ring-destructive',
          ),
        placeholder: () => 'text-muted-foreground',
        input: () => 'text-sm',
        menu: () => 'mt-2 rounded-lg border bg-popover text-popover-foreground shadow-md py-1',
        menuList: () => 'text-sm p-2',
        option: ({ isFocused, isSelected }) =>
          cn(
            'relative flex cursor-default select-none items-center rounded-lg px-2 py-1.5 outline-none transition-colors',
            isSelected && 'bg-primary text-primary-foreground',
            isFocused && !isSelected && 'bg-accent text-accent-foreground',
            !isFocused && !isSelected && 'text-popover-foreground hover:bg-accent hover:text-accent-foreground',
          ),
        multiValue: () => 'inline-flex items-center bg-secondary text-secondary-foreground mr-1 rounded-lg',
        multiValueLabel: () => 'px-2 text-xs leading-none',
        multiValueRemove: () =>
          cn('flex items-center justify-center p-1 rounded-lg', 'hover:bg-destructive hover:text-destructive-foreground rounded-lg'),
        valueContainer: () => 'gap-1 flex flex-wrap items-center rounded-lg',
        clearIndicator: () => 'p-1 text-muted-foreground hover:text-foreground ',
        dropdownIndicator: () => 'p-1 text-muted-foreground hover:text-foreground',
        indicatorSeparator: () => 'bg-input mx-2 my-2 w-[1px]',
        noOptionsMessage: () => 'text-muted-foreground p-2 text-sm',
      }}
      {...props}
    />
  );
});

MultiSelectCreate.displayName = 'MultiSelectCreate';
