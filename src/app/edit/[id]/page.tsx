import { createClient } from '@/utils/supabase/server'
import { updateTransaction } from './actions'
import { redirect } from 'next/navigation'
import { EditTransactionForm } from './EditTransactionForm'

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

    const updateAction = updateTransaction.bind(null, id)

    return (
        <div className="flex min-h-screen flex-col p-4 pb-24 space-y-6 max-w-full overflow-x-hidden">
            <h1 className="text-2xl font-bold text-slate-100">Edit Transaksi</h1>

            <EditTransactionForm
                transaction={transaction}
                categories={categories || []}
                wallets={wallets || []}
                updateAction={updateAction}
            />
        </div>
    )
}
