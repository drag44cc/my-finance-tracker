'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AmountInput } from '@/components/ui/AmountInput';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

type EditTransactionFormProps = {
    transaction: any;
    categories: any[];
    wallets: any[];
    updateAction: (formData: FormData) => Promise<void>;
};

export function EditTransactionForm({ transaction, categories, wallets, updateAction }: EditTransactionFormProps) {
    const type = transaction.amount < 0 ? 'expense' : 'income';

    return (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur overflow-hidden">
            <CardContent className="pt-6">
                <form action={updateAction} className="space-y-4">
                    <input type="hidden" name="type" value={type} />

                    <div className="space-y-2">
                        <Label>Jumlah (Rp)</Label>
                        <AmountInput
                            name="amount"
                            defaultValue={Math.abs(transaction.amount)}
                            required
                            className="text-2xl font-bold bg-slate-950 border-slate-800 h-14"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Select name="categoryId" defaultValue={transaction.category_id}>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {categories?.filter(c => c.type === type).map(c => (
                                    <SelectItem key={c.id} value={c.id} className="text-slate-100">
                                        {c.icon} {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Dompet / Akun</Label>
                        <Select name="walletId" defaultValue={transaction.wallet_id}>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih dompet" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                {wallets?.map(w => (
                                    <SelectItem key={w.id} value={w.id} className="text-slate-100">
                                        {w.name} (Rp {w.balance.toLocaleString('id-ID')})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Input
                            name="date"
                            type="datetime-local"
                            defaultValue={new Date(transaction.date).toISOString().slice(0, 16)}
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Catatan</Label>
                        <Input
                            name="note"
                            defaultValue={transaction.note || ''}
                            placeholder="Beli apa?"
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link href="/">
                            <Button type="button" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Update
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
