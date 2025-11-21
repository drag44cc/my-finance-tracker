import { createClient } from '@/utils/supabase/server'
import { addTransaction } from './actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { redirect } from 'next/navigation'
import { TransactionForm } from './TransactionForm'

export default async function AddTransactionPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch categories and wallets
    const { data: categories } = await supabase.from('categories').select('*')
    const { data: wallets } = await supabase.from('wallets').select('*')

    const params = await searchParams
    const defaultTab = params.tab === 'income' ? 'income' : 'expense'

    return (
        <div className="flex min-h-screen flex-col p-4 pb-24 space-y-6 max-w-full overflow-x-hidden">
            <h1 className="text-2xl font-bold text-slate-100">Tambah Transaksi</h1>

            <Tabs defaultValue={defaultTab} className="w-full max-w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="expense" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">Pengeluaran</TabsTrigger>
                    <TabsTrigger value="income" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Pemasukan</TabsTrigger>
                </TabsList>

                <TabsContent value="expense" className="max-w-full">
                    <TransactionForm
                        type="expense"
                        categories={categories?.filter(c => c.type === 'expense') || []}
                        wallets={wallets || []}
                        addTransaction={addTransaction}
                    />
                </TabsContent>

                <TabsContent value="income" className="max-w-full">
                    <TransactionForm
                        type="income"
                        categories={categories?.filter(c => c.type === 'income') || []}
                        wallets={wallets || []}
                        addTransaction={addTransaction}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
