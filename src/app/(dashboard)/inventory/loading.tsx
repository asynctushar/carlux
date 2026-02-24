import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
        </div>
    );
}