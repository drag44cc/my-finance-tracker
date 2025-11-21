'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AmountInput } from '@/components/ui/AmountInput';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLoading } from '@/components/LoadingProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type SetBudgetDialogProps = {
    categories: any[];
    setBudget: (formData: FormData) => Promise<void>;
};

export function SetBudgetDialog({ categories, setBudget }: SetBudgetDialogProps) {
    const [open, setOpen] = useState(false);
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startLoading();

        try {
            const formData = new FormData(e.currentTarget);
            await setBudget(formData);
            toast.success('✅ Budget berhasil diatur!');
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error('Failed to set budget:', error);
            toast.error('❌ Gagal mengatur budget. Silakan coba lagi.');
        } finally {
            stopLoading();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Set Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Atur Budget</DialogTitle>
                    <DialogDescription>
                        Tentukan batas pengeluaran untuk setiap kategori.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoryId">Kategori</Label>
                        <Select name="categoryId" required disabled={isLoading}>
                            <SelectTrigger className="bg-slate-950 border-slate-800">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                {categories?.map(c => (
                                    <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Batas Maksimal (Rp)</Label>
                        <AmountInput
                            name="amount"
                            placeholder="0"
                            className="bg-slate-950 border-slate-800"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            'Simpan'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
