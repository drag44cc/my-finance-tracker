import { createClient } from '@/utils/supabase/server'
import { updateTransaction } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AmountInput } from '@/components/ui/AmountInput'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { id } = await params

    // Fetch transaction details
    const { data: transaction } = await supabase.from('transactions').select('*').eq('id', id).single()

    if (!transaction) {
        return <div className="p-4 text-center text-slate-500">Transaksi tidak ditemukan</div>
    }

    // Fetch categories and wallets
    const { data: categories } = await supabase.from('categories').select('*')
    const { data: wallets } = await supabase.from('wallets').select('*')

    const type = transaction.amount < 0 ? 'expense' : 'income'
    const updateAction = updateTransaction.bind(null, id)

    return (
        <div className="flex min-h-screen flex-col p-4 pb-24 space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Edit Transaksi</h1>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
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
                            <select
                                name="categoryId"
                                defaultValue={transaction.category_id}
                                className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                                {categories?.filter(c => c.type === type).map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Dompet / Akun</Label>
                            <select
                                name="walletId"
                                defaultValue={transaction.wallet_id}
                                className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                                {wallets?.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} (Rp {w.balance})</option>
                                ))}
                            </select>
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
        </div>
    )
}
