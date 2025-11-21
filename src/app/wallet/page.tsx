import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addWallet } from './actions'
import { WalletList } from '@/components/wallet/WalletList'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet as WalletIcon } from 'lucide-react'
import { AddWalletDialog } from './AddWalletDialog'

export default async function WalletPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: wallets } = await supabase.from('wallets').select('*').order('created_at', { ascending: true })

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <WalletIcon className="h-6 w-6 text-indigo-500" />
                    Dompet Saya
                </h1>

                <AddWalletDialog addWallet={addWallet} />
            </div>

            <div className="grid gap-4">
                {wallets?.length === 0 ? (
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-center py-8">
                        <CardContent>
                            <p className="text-slate-500">Belum ada dompet. Tambahkan sekarang!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <WalletList wallets={wallets || []} />
                )}
            </div>
        </div>
    )
}
