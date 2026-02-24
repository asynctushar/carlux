import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Car } from '@/types/car.type';
import Image from 'next/image';

interface ImageDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    car: Car;
}

const ImageDialog = ({ open, setOpen, car }: ImageDialogProps) => {
    const images: string[] = car.images ?? [];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                            <DialogTitle className="text-base font-semibold truncate">
                                {car.title}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">{car.brand}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 font-mono text-xs">
                            {car.sku}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    {images.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-52 rounded-lg bg-muted gap-3">
                            <p className="text-sm text-muted-foreground">No images available</p>
                        </div>
                    ) : (
                        <Carousel className="w-full" opts={{ loop: true }}>
                            <CarouselContent>
                                {images.map((src, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                                            <Image
                                                src={src}
                                                alt={`${car.title} — image ${index + 1}`}
                                                fill
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 560px"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {images.length > 1 && (
                                <>
                                    <CarouselPrevious className="cursor-pointer left-2 h-8 w-8 shadow-md" />
                                    <CarouselNext className="cursor-pointer right-2 h-8 w-8 shadow-md" />
                                </>
                            )}
                        </Carousel>
                    )}

                    {images.length > 1 && (
                        <p className="text-xs text-muted-foreground text-center mt-3">
                            {images.length} image{images.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageDialog;