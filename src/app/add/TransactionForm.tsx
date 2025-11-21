'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AmountInput } from '@/components/ui/AmountInput';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLoading } from '@/components/LoadingProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type TransactionFormProps = {
    type: 'income' | 'expense';
    categories: any[];
    wallets: any[];
    addTransaction: (formData: FormData) => Promise<{ success: boolean; error?: string } | undefined>;
};


export function TransactionForm({ type, categories, wallets, addTransaction }: TransactionFormProps) {
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startLoading();

        try {
            const formData = new FormData(e.currentTarget);
            const result = await addTransaction(formData);

            if (result?.success === false) {
                toast.error('❌ Gagal menambahkan transaksi. Silakan coba lagi.');
            } else {
                toast.success(type === 'income'
                    ? '✅ Pemasukan berhasil ditambahkan!'
                    : '✅ Pengeluaran berhasil ditambahkan!'
                );
                router.push('/');
            }
        } catch (error) {
            console.error('Failed to add transaction:', error);
            toast.error('❌ Gagal menambahkan transaksi. Silakan coba lagi.');
        } finally {
            stopLoading();
        }
    }

    return (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur overflow-hidden">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="type" value={type} />

                    <div className="space-y-2">
                        <Label>Jumlah (Rp)</Label>
                        <AmountInput
                            name="amount"
                            placeholder="0"
                            required
                            disabled={isLoading}
                            className="text-2xl font-bold bg-slate-950 border-slate-800 h-14"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Select name="categoryId" disabled={isLoading} required>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {categories.length === 0 ? (
                                    <SelectItem value="none" disabled>Belum ada kategori</SelectItem>
                                ) : (
                                    categories.map(c => (
                                        <SelectItem key={c.id} value={c.id} className="text-slate-100">
                                            {c.icon} {c.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Dompet / Akun</Label>
                        <Select name="walletId" disabled={isLoading} required>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih dompet" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {wallets.length === 0 ? (
                                    <SelectItem value="none" disabled>Belum ada dompet</SelectItem>
                                ) : (
                                    wallets.map(w => (
                                        <SelectItem key={w.id} value={w.id} className="text-slate-100">
                                            {w.name} (Rp {w.balance.toLocaleString('id-ID')})
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Input
                            name="date"
                            type="datetime-local"
                            defaultValue={(() => {
                                const now = new Date();
                                const year = now.getFullYear();
                                const month = String(now.getMonth() + 1).padStart(2, '0');
                                const day = String(now.getDate()).padStart(2, '0');
                                const hours = String(now.getHours()).padStart(2, '0');
                                const minutes = String(now.getMinutes()).padStart(2, '0');
                                return `${year}-${month}-${day}T${hours}:${minutes}`;
                            })()}
                            disabled={isLoading}
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Catatan (Opsional)</Label>
                        <Input
                            name="note"
                            placeholder="Beli apa?"
                            disabled={isLoading}
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Link href="/" className="flex-1">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Batal
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 text-white ${type === 'expense' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
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
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
