'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: 'rgb(15 23 42)', // slate-900
                    border: '1px solid rgb(51 65 85)', // slate-700
                    color: 'rgb(226 232 240)', // slate-200
                },
                className: 'font-sans',
                duration: 3000,
            }}
            richColors
        />
    );
}
