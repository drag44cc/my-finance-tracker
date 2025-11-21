'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    minimum: 0.08,
});

export function NavigationProgress() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    return null;
}
