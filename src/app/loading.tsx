import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
    return (
        <div className="space-y-6 p-4">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Balance Card Skeleton */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 flex-1" />
                            <Skeleton className="h-8 flex-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>

            {/* Recent Transactions Skeleton */}
            <div className="space-y-3">
                <Skeleton className="h-6 w-40" />
                {[1, 2, 3, 4, 5].map(i => (
                    <Card key={i} className="border-slate-800 bg-slate-900/50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
