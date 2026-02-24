"use client";

import { Car } from "@/types/car.type";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PackageSearch, ImageIcon, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ImageDialog from "./image-dialog";

interface InventoryClientProps {
    cars: Car[];
}

const InventoryClient = ({ cars: allCars }: InventoryClientProps) => {
    const [cars] = useState(allCars);
    const [page, setPage] = useState(0);
    const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const rowsPerPage = 8;

    const totalPages = useMemo(() => Math.ceil((cars.length || 0) / rowsPerPage), [rowsPerPage, cars]);
    const currentCars = useMemo(() => cars.slice(page * rowsPerPage, (page + 1) * rowsPerPage), [rowsPerPage, page, cars]);

    return (
        <div className="bg-background pb-16">
            <div className="py-8">
                {cars.length === 0 ? (
                    <Card className="shadow-sm border">
                        <CardContent className="flex flex-col items-center justify-center py-24 gap-3">
                            <div className="rounded-full bg-muted p-4">
                                <PackageSearch className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">No cars found</h3>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <Card className="shadow-sm border overflow-hidden hidden md:block p-0">
                            <CardContent className="p-0">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-primary-foreground border-b border-border">
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">SKU</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Title</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Brand</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Stock</th>
                                            <th className="p-5 text-left font-semibold uppercase tracking-wide text-xs">Rating</th>
                                            <th className="p-5 text-center font-semibold uppercase tracking-wide text-xs">Images</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {currentCars.map((car) => (
                                            <tr
                                                key={car.id}
                                                className="hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="px-5 py-4 font-mono text-xs text-muted-foreground/90">
                                                    {car.sku}
                                                </td>
                                                <td className="px-5 py-4 font-medium text-foreground/90 max-w-50 truncate">
                                                    {car.title}
                                                </td>
                                                <td className="px-5 py-4 text-foreground">
                                                    {car.brand}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {car.stock === 0 ? <Badge variant="destructive">Out of Stock</Badge> : car.stock < 5 ? <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30">{car.stock} left</Badge> : <Badge variant="secondary">{car.stock} in stock</Badge>
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
                                                        onClick={() => {
                                                            setSelectedCar(car);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        <span className="sr-only">View images</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Filler rows to keep height stable */}
                                        {Array.from({ length: rowsPerPage - currentCars.length }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="pointer-events-none border-0">
                                                <td colSpan={6} className="px-5 py-4 h-15" />
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
                                    <CardContent >
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
                                                onClick={() => {
                                                    setSelectedCar(car);
                                                    setOpen(true);
                                                }}
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                                <span className="sr-only">View images</span>
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                                            {car.stock === 0 ? <Badge variant="destructive">Out of Stock</Badge> : car.stock < 5 ? <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30">{car.stock} left</Badge> : <Badge variant="secondary">{car.stock} in stock</Badge>
                                            }
                                            <span className="inline-flex items-center gap-1 font-medium text-sm">
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                {car.rating.toFixed(1)}
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
                                    <span className="font-medium text-foreground">{page * rowsPerPage + 1}</span>
                                    {" – "}
                                    <span className="font-medium text-foreground">
                                        {Math.min((page + 1) * rowsPerPage, cars.length)}
                                    </span>
                                    {" of "}
                                    <span className="font-medium text-foreground">{cars.length}</span>
                                    {" cars"}
                                </p>

                                <div className="flex items-center gap-1 order-1 sm:order-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 0}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span className="sr-only">Previous</span>
                                    </Button>

                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum: number;
                                        if (totalPages <= 5) pageNum = i;
                                        else if (page < 3) pageNum = i;
                                        else if (page > totalPages - 4) pageNum = totalPages - 5 + i;
                                        else pageNum = page - 2 + i;

                                        return (
                                            <Button
                                                key={i}
                                                variant={page === pageNum ? "default" : "outline"}
                                                size="icon"
                                                className="h-8 w-8 text-sm cursor-pointer"
                                                onClick={() => setPage(pageNum)}
                                            >
                                                {pageNum + 1}
                                            </Button>
                                        );
                                    })}

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer"
                                        onClick={() => setPage(page + 1)}
                                        disabled={page >= totalPages - 1}
                                    >
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

export default InventoryClient;