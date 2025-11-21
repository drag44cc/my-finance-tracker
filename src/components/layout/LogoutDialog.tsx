'use client';

import { signout } from '@/app/auth/actions';
import { LogOut, Loader2 } from 'lucide-react';
import { useLoading } from '@/components/LoadingProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function LogoutDialog() {
    const [open, setOpen] = useState(false);
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleLogout() {
        startLoading();
        try {
            await signout();
            router.push('/login');
            setOpen(false);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            stopLoading();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-slate-400 hover:text-slate-200 transition-colors">
                    <LogOut className="h-5 w-5" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Keluar Aplikasi?</DialogTitle>
                    <DialogDescription>
                        Anda harus login kembali untuk mengakses data Anda.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Keluar...
                            </>
                        ) : (
                            'Keluar'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
