import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-9 w-28" />
            </div>

            <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <Card key={i} className="border-slate-800 bg-slate-900/50 backdrop-blur">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-6" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
