"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  categoryIconGroups,
  CategoryIconName,
  categoryIcons,
} from "@/types/category-icon";
import { useState } from "react";
import { Check, ChevronDown, HelpCircle } from "reicon-react";

interface CategoryIconPickerProps {
  value?: CategoryIconName;
  onChange: (value: CategoryIconName) => void;
  error?: string;
}

const CategoryIconPicker = ({
  value,
  onChange,
  error,
}: CategoryIconPickerProps) => {
  const [open, setOpen] = useState(false);

  const SelectedIcon = value ? categoryIcons[value]?.icon : null;

  return (
    <div className="w-full h-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-expanded={open}
          aria-haspopup="dialog"
          className="h-10 w-full justify-between px-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted/40">
              {SelectedIcon ? (
                <SelectedIcon size={24} />
              ) : (
                <HelpCircle size={20} className="text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">
                {value ?? "Select an icon"}
              </p>

              <p className="text-xs text-muted-foreground">
                {value
                  ? "Click to change the icon"
                  : "Choose an icon for this category"}
              </p>
            </div>
          </div>
          <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent align="start" className="w-360px p-0">
          <Command>
            <CommandInput placeholder="Search icons..." />

            <CommandList className="max-h-90">
              <CommandEmpty>No icons found.</CommandEmpty>

              {categoryIconGroups.map((group) => (
                <CommandGroup key={group.name} heading={group.name}>
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {group.icons.map((iconName) => {
                      const Icon = categoryIcons[iconName].icon;
                      const isSelected = value === iconName;

                      return (
                        <CommandItem
                          key={iconName}
                          value={iconName}
                          onSelect={() => {
                            onChange(iconName);
                            setOpen(false);
                          }}
                          className={[
                            "relative flex h-16 cursor-pointer",
                            "flex-col items-center justify-center",
                            "gap-1 rounded-md",
                            "text-muted-foreground",
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "",
                          ].join(" ")}
                        >
                          <Icon size={24} />

                          <span className="max-w-full truncate px-1 text-[10px]">
                            {iconName}
                          </span>

                          {isSelected && (
                            <Check
                              size={13}
                              className="absolute right-1 top-1"
                            />
                          )}
                        </CommandItem>
                      );
                    })}
                  </div>
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default CategoryIconPicker;
