import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addWallet } from './actions'
import { WalletList } from '@/components/wallet/WalletList'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet as WalletIcon, Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Plus className="h-4 w-4 mr-1" /> Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Tambah Dompet Baru</DialogTitle>
                            <DialogDescription>
                                Buat akun dompet baru untuk memisahkan saldo Anda.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={addWallet} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Dompet</Label>
                                <Input id="name" name="name" placeholder="Contoh: BCA Utama" className="bg-slate-950 border-slate-800" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="balance">Saldo Awal</Label>
                                <Input id="balance" name="balance" type="number" placeholder="0" className="bg-slate-950 border-slate-800" required />
                            </div>
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Simpan</Button>
                        </form>
                    </DialogContent>
                </Dialog>
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
