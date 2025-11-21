import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { transferMoney } from './actions'
import { ArrowRightLeft } from 'lucide-react'
import { TransferForm } from './TransferForm'

export default async function TransferPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch wallets
    const { data: wallets } = await supabase.from('wallets').select('*')

    return (
        <div className="flex min-h-screen flex-col p-4 pb-24 space-y-6">
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <ArrowRightLeft className="h-6 w-6 text-indigo-500" />
                Transfer Antar Dompet
            </h1>

            <TransferForm wallets={wallets || []} transferMoney={transferMoney} />
        </div>
    )
}
