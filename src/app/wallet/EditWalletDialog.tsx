'use client'

import { updateWallet } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

export function EditWalletDialog({ wallet }: { wallet: any }) {
    const [open, setOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSaving(true)
        try {
            await updateWallet(wallet.id, formData)
            setOpen(false)
        } catch (error) {
            alert('Gagal mengupdate dompet')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-400">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Edit Dompet</DialogTitle>
                    <DialogDescription>
                        Ubah nama atau saldo dompet Anda.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Dompet</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={wallet.name}
                            className="bg-slate-950 border-slate-800"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="balance">Saldo</Label>
                        <Input
                            id="balance"
                            name="balance"
                            type="number"
                            defaultValue={wallet.balance}
                            className="bg-slate-950 border-slate-800"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
