"use client";

import { Car } from "@/types/car.type";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PackageSearch, ImageIcon, ChevronLeft, ChevronRight, Star, DollarSign } from "lucide-react";
import ImageDialog from "./image-dialog";
import Toolbar from "./toolbar";

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface InventoryClientProps {
    cars: Car[];
}

const InventoryClient = ({ cars: allCars }: InventoryClientProps) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortOption>('default');

    const [page, setPage] = useState(0);
    const rowsPerPage = 8;

    const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const filteredCars = useMemo(() => {
        let result = [...allCars];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((car) => car.title.toLowerCase().includes(q));
        }

        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

        return result;
    }, [allCars, search, sort]);

    const totalPages = Math.ceil(filteredCars.length / rowsPerPage);
    // Clamp page so it never exceeds the filtered total (e.g. after search narrows results)
    const safePage = Math.min(page, Math.max(0, totalPages - 1));
    const currentCars = filteredCars.slice(safePage * rowsPerPage, (safePage + 1) * rowsPerPage);

    // Reset page to 0 on any filter/sort change
    const handleSearchChange = (val: string) => { setSearch(val); setPage(0); };
    const handleSortChange = (val: SortOption) => { setSort(val); setPage(0); };

    return (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-400 transition-all">
            <div className="py-8">
                <Toolbar
                    search={search}
                    sort={sort}
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                />
                {filteredCars.length === 0 ? (
                    <Card className="shadow-sm border overflow-hidden">
                        <CardContent
                            className="flex flex-col items-center justify-center gap-4 px-6"
                            style={{ minHeight: `${rowsPerPage * 57 + 48}px` }}
                        >
                            {/* Icon cluster */}
                            <div className="relative">
                                <div className="rounded-2xl bg-muted p-5 shadow-inner">
                                    <PackageSearch className="w-10 h-10 text-muted-foreground/60" />
                                </div>
                                {/* Small decorative dot ring */}
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                                </span>
                            </div>

                            {/* Text */}
                            <div className="text-center space-y-1.5 max-w-xs">
                                <h3 className="text-base font-semibold text-foreground tracking-tight">
                                    No cars match your search
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Try different keywords or{" "}
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-sm font-medium underline-offset-2"
                                        onClick={() => {
                                            handleSearchChange('');
                                            handleSortChange('default');
                                        }}
                                    >
                                        reset all filters
                                    </Button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <Card className="shadow-sm  overflow-hidden hidden md:block p-0">
                            <CardContent className="p-0">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-primary-foreground border-b border-border">
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">SKU</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Title</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Brand</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Price</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Stock</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Rating</th>
                                            <th className="p-5 text-center font-semibold uppercase tracking-wide text-xs">Images</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {currentCars.map((car) => (
                                            <tr key={car.id} className="hover:bg-muted/30 transition-all animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                                                <td className="px-5 py-4 font-mono text-xs text-muted-foreground/90">{car.sku}</td>
                                                <td className="px-5 py-4 font-medium text-foreground/90 max-w-50 truncate">{car.title}</td>
                                                <td className="px-5 py-4 text-foreground">{car.brand}</td>
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center font-medium text-sm">
                                                        <DollarSign className="w-3.5 h-3.5" />
                                                        {Math.floor(car.price)}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {car.stock === 0
                                                        ? <Badge variant="destructive">Out of Stock</Badge>
                                                        : car.stock < 5
                                                            ? <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30">{car.stock} left</Badge>
                                                            : <Badge variant="secondary">{car.stock} in stock</Badge>
                                                    }
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center gap-1 font-medium text-sm">
                                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                        {car.rating.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary cursor-pointer"
                                                        onClick={() => { setSelectedCar(car); setOpen(true); }}
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        <span className="sr-only">View images</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {Array.from({ length: rowsPerPage - currentCars.length }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="pointer-events-none border-0">
                                                <td colSpan={7} className="px-5 py-4 h-15" />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                        {/* Mobile Cards */}
                        <div className="flex flex-col gap-3 md:hidden">
                            {currentCars.map((car) => (
                                <Card key={car.id} className="shadow-sm border">
                                    <CardContent>
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-foreground truncate">{car.title}</p>
                                                <p className="text-sm text-muted-foreground mt-0.5">{car.brand}</p>
                                                <p className="font-mono text-xs text-muted-foreground mt-1">{car.sku}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="shrink-0 h-8 w-8 p-0"
                                                onClick={() => { setSelectedCar(car); setOpen(true); }}
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                                <span className="sr-only">View images</span>
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-border">
                                            <div className="flex items-center gap-3">
                                                {car.stock === 0
                                                    ? <Badge variant="destructive">Out of Stock</Badge>
                                                    : car.stock < 5
                                                        ? <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30">{car.stock} left</Badge>
                                                        : <Badge variant="secondary">{car.stock} in stock</Badge>
                                                }
                                                <span className="inline-flex items-center gap-1 font-medium text-sm">
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                    {car.rating.toFixed(1)}
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center font-medium text-sm">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                {Math.floor(car.price)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
                                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                                    Showing{" "}
                                    <span className="font-medium text-foreground">{safePage * rowsPerPage + 1}</span>
                                    {" – "}
                                    <span className="font-medium text-foreground">{Math.min((safePage + 1) * rowsPerPage, filteredCars.length)}</span>
                                    {" of "}
                                    <span className="font-medium text-foreground">{filteredCars.length}</span>
                                    {" cars"}
                                </p>

                                <div className="flex items-center gap-1 order-1 sm:order-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => setPage(safePage - 1)} disabled={safePage === 0}>
                                        <ChevronLeft className="w-4 h-4" />
                                        <span className="sr-only">Previous</span>
                                    </Button>

                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum: number;
                                        if (totalPages <= 5) pageNum = i;
                                        else if (safePage < 3) pageNum = i;
                                        else if (safePage > totalPages - 4) pageNum = totalPages - 5 + i;
                                        else pageNum = safePage - 2 + i;

                                        return (
                                            <Button
                                                key={i}
                                                variant={safePage === pageNum ? "default" : "outline"}
                                                size="icon"
                                                className="h-8 w-8 text-sm cursor-pointer"
                                                onClick={() => setPage(pageNum)}
                                            >
                                                {pageNum + 1}
                                            </Button>
                                        );
                                    })}

                                    <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => setPage(safePage + 1)} disabled={safePage >= totalPages - 1}>
                                        <ChevronRight className="w-4 h-4" />
                                        <span className="sr-only">Next</span>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {selectedCar && (
                            <ImageDialog open={open} setOpen={setOpen} car={selectedCar} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(InventoryClient);