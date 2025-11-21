'use client';

import { Button } from '@/components/ui/button';
import { AmountInput } from '@/components/ui/AmountInput';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useLoading } from '@/components/LoadingProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type TransferFormProps = {
    wallets: any[];
    transferMoney: (formData: FormData) => Promise<void>;
};

export function TransferForm({ wallets, transferMoney }: TransferFormProps) {
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startLoading();

        try {
            const formData = new FormData(e.currentTarget);
            await transferMoney(formData);
            toast.success('✅ Transfer berhasil!');
            router.push('/');
        } catch (error) {
            console.error('Failed to transfer:', error);
            toast.error('❌ Transfer gagal. Silakan coba lagi.');
        } finally {
            stopLoading();
        }
    }

    return (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur overflow-hidden">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Dari Dompet</Label>
                        <Select name="fromWalletId" disabled={isLoading} required>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih dompet sumber" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {wallets?.map(w => (
                                    <SelectItem key={w.id} value={w.id} className="text-slate-100">
                                        {w.name} (Rp {w.balance?.toLocaleString('id-ID')})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Ke Dompet</Label>
                        <Select name="toWalletId" disabled={isLoading} required>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih dompet tujuan" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {wallets?.map(w => (
                                    <SelectItem key={w.id} value={w.id} className="text-slate-100">
                                        {w.name} (Rp {w.balance?.toLocaleString('id-ID')})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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
                        <Label>Catatan (Opsional)</Label>
                        <Input
                            name="note"
                            placeholder="Catatan transfer..."
                            disabled={isLoading}
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Transfer'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
