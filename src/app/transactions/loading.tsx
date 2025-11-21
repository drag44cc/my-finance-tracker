import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
    return (
        <div className="space-y-6 p-4">
            <Skeleton className="h-8 w-48" />

            <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <Card key={i} className="border-slate-800 bg-slate-900/50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <div className="text-right space-y-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-3 w-16 ml-auto" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
