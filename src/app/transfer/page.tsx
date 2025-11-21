import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { transferMoney } from './actions'
import { Button } from '@/components/ui/button'
import { AmountInput } from '@/components/ui/AmountInput'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRightLeft } from 'lucide-react'

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

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                    <form action={transferMoney} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Dari Dompet</Label>
                            <select
                                name="fromWalletId"
                                className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                required
                            >
                                <option value="">Pilih dompet sumber</option>
                                {wallets?.map(w => (
                                    <option key={w.id} value={w.id}>
                                        {w.name} (Rp {w.balance?.toLocaleString('id-ID')})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Ke Dompet</Label>
                            <select
                                name="toWalletId"
                                className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                required
                            >
                                <option value="">Pilih dompet tujuan</option>
                                {wallets?.map(w => (
                                    <option key={w.id} value={w.id}>
                                        {w.name} (Rp {w.balance?.toLocaleString('id-ID')})
                                    </option>
                                ))}
                            </select>
                        </div>

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
                            <Label>Catatan (Opsional)</Label>
                            <Input
                                name="note"
                                placeholder="Catatan transfer..."
                                className="bg-slate-950 border-slate-800"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            Transfer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
