"use client";

import { SortOption } from './inventory-client';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, X, ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
    search: string;
    sort: SortOption;
    onSearchChange: (val: string) => void;
    onSortChange: (val: SortOption) => void;
}

const sortConfig: Record<SortOption, { label: string; icon: React.ReactNode; }> = {
    default: {
        label: 'Default order',
        icon: <ChevronsUpDown className="h-3.5 w-3.5" />,
    },
    'price-asc': {
        label: 'Price: Low to High',
        icon: <ArrowUp className="h-3.5 w-3.5" />,
    },
    'price-desc': {
        label: 'Price: High to Low',
        icon: <ArrowDown className="h-3.5 w-3.5" />,
    },
};

const Toolbar = ({ search, sort, onSearchChange, onSortChange }: ToolbarProps) => {
    const [inputValue, setInputValue] = useState(search);
    const [debouncedValue] = useDebounce(inputValue, 300);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        onSearchChange(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
        if (search === '') setInputValue('');
    }, [search]);

    const handleClear = () => {
        setInputValue('');
        onSearchChange('');
    };

    const hasActiveFilter = inputValue.trim() !== '' || sort !== 'default';

    return (
        <div className="mb-5 rounded-xl border border-border bg-card shadow-sm overflow-hidden">

            <div className="px-4 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                {/* Search field */}
                <div
                    className={cn(
                        "relative flex-1 flex items-center rounded-lg border transition-all duration-200",
                        isFocused
                            ? "border-primary ring-2 ring-primary/15 bg-background"
                            : "border-border bg-muted/40 hover:bg-muted/70 hover:border-border/80"
                    )}
                >
                    <Search
                        className={cn(
                            "absolute left-3 h-4 w-4 transition-colors duration-200 pointer-events-none",
                            isFocused ? "text-primary" : "text-muted-foreground"
                        )}
                    />
                    <Input
                        placeholder="Search by title..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="border-0 bg-transparent shadow-none pl-9 pr-8 h-9 focus-visible:ring-0 text-sm placeholder:text-muted-foreground/60"
                    />
                    {inputValue && (
                        <button
                            onClick={handleClear}
                            className="absolute right-2.5 flex items-center justify-center h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-150"
                            aria-label="Clear search"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {/* Divider — only on desktop */}
                <div className="hidden sm:block h-6 w-px bg-border shrink-0" />

                {/* Sort dropdown */}
                <Select value={sort} onValueChange={(val) => onSortChange(val as SortOption)}>
                    <SelectTrigger
                        className={cn(
                            "w-full sm:w-48 h-9 border rounded-lg text-sm transition-all duration-200 cursor-pointer shadow-none",
                            sort !== 'default'
                                ? "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10"
                                : "border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <span className={cn(
                                "shrink-0 transition-colors",
                                sort !== 'default' ? "text-primary" : "text-muted-foreground"
                            )}>
                                {sortConfig[sort].icon}
                            </span>
                            <SelectValue>
                                <span className="truncate">{sortConfig[sort].label}</span>
                            </SelectValue>
                        </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-lg shadow-lg border-border">
                        {(Object.entries(sortConfig) as [SortOption, typeof sortConfig[SortOption]][]).map(([value, config]) => (
                            <SelectItem
                                key={value}
                                value={value}
                                className="cursor-pointer text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{config.icon}</span>
                                    {config.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Clear all*/}
                {hasActiveFilter && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            handleClear();
                            onSortChange('default');
                        }}
                        className="shrink-0 h-9 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted gap-1.5 rounded-lg border border-dashed border-border cursor-pointer"
                    >
                        <X className="h-3 w-3" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Toolbar;