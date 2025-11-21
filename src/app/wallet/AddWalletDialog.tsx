'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useLoading } from '@/components/LoadingProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AddWalletDialogProps = {
    addWallet: (formData: FormData) => Promise<void>;
};

export function AddWalletDialog({ addWallet }: AddWalletDialogProps) {
    const [open, setOpen] = useState(false);
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startLoading();

        try {
            const formData = new FormData(e.currentTarget);
            await addWallet(formData);
            toast.success('✅ Dompet berhasil ditambahkan!');
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error('Failed to add wallet:', error);
            toast.error('❌ Gagal menambahkan dompet. Silakan coba lagi.');
        } finally {
            stopLoading();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Baru
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Tambah Dompet Baru</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Buat akun dompet baru untuk memisahkan saldo Anda.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Dompet</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Contoh: BCA Utama"
                            className="bg-slate-950 border-slate-800 text-slate-100"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="balance">Saldo Awal</Label>
                        <Input
                            id="balance"
                            name="balance"
                            type="number"
                            placeholder="0"
                            className="bg-slate-950 border-slate-800 text-slate-100"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
