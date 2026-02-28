import InventoryClient from "@/components/inventory/inventory-client";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCar } from "@/services/car.service";
import { Car } from "@/types/car.type";
import { AlertCircle } from "lucide-react";

const Inventory = async () => {
    const result = await getAllCar();

    if (!result.ok) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <Card className="max-w-md w-full shadow-lg">
                    <CardContent className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                            <AlertCircle className="h-8 w-8 text-destructive" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Failed to Load Cars</h2>
                            <p className="text-sm text-muted-foreground">
                                {result.error?.message || "Something went wrong while loading car data."}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const cars: Car[] = result.data;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-2 transition-all duration-400">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    Carlux Inventory
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage and browse your vehicle stock
                </p>
            </div>

            <InventoryClient cars={cars} />
        </div>
    );
};

export default Inventory;