import { createClient } from '@/utils/supabase/server'
import { addTransaction } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AmountInput } from '@/components/ui/AmountInput'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AddTransactionPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch categories and wallets
    const { data: categories } = await supabase.from('categories').select('*')
    const { data: wallets } = await supabase.from('wallets').select('*')

    // If no wallets or categories, we might need to prompt user to create them.
    // For now, let's assume they exist or we handle empty state.

    const params = await searchParams
    const defaultTab = params.tab === 'income' ? 'income' : 'expense'

    return (
        <div className="flex min-h-screen flex-col p-4 pb-24 space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Tambah Transaksi</h1>

            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="expense" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">Pengeluaran</TabsTrigger>
                    <TabsTrigger value="income" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Pemasukan</TabsTrigger>
                </TabsList>

                <TabsContent value="expense">
                    <TransactionForm type="expense" categories={categories?.filter(c => c.type === 'expense') || []} wallets={wallets || []} />
                </TabsContent>

                <TabsContent value="income">
                    <TransactionForm type="income" categories={categories?.filter(c => c.type === 'income') || []} wallets={wallets || []} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function TransactionForm({ type, categories, wallets }: { type: 'income' | 'expense', categories: any[], wallets: any[] }) {
    return (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="pt-6">
                <form action={addTransaction} className="space-y-4">
                    <input type="hidden" name="type" value={type} />

                    <div className="space-y-2">
                        <Label>Jumlah (Rp)</Label>
                        <AmountInput
                            name="amount"
                            placeholder="0"
                            required
                            className="text-2xl font-bold bg-slate-950 border-slate-800 h-14"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Kategori</Label>
                        <select name="categoryId" className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            {categories.length === 0 ? (
                                <option value="">Belum ada kategori</option>
                            ) : (
                                categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Dompet / Akun</Label>
                        <select name="walletId" className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            {wallets.length === 0 ? (
                                <option value="">Belum ada dompet</option>
                            ) : (
                                wallets.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} (Rp {w.balance})</option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Input
                            name="date"
                            type="datetime-local"
                            defaultValue={new Date().toISOString().slice(0, 16)}
                            className="bg-slate-950 border-slate-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Catatan (Opsional)</Label>
                        <Input name="note" placeholder="Beli apa?" className="bg-slate-950 border-slate-800" />
                    </div>

                    <div className="flex gap-3">
                        <Link href="/" className="flex-1">
                            <Button type="button" variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" className={`flex-1 text-white ${type === 'expense' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
