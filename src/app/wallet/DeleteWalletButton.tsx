'use client'

import { deleteWallet } from './actions'
import { Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useLoading } from '@/components/LoadingProvider'
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
import { Button } from '@/components/ui/button'

export function DeleteWalletButton({ walletId }: { walletId: string }) {
    const [open, setOpen] = useState(false)
    const { startLoading, stopLoading, isLoading } = useLoading()

    async function handleDelete() {
        startLoading()
        try {
            await deleteWallet(walletId)
            setOpen(false)
        } catch (error) {
            alert('Gagal menghapus dompet')
        } finally {
            stopLoading()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Hapus Dompet?</DialogTitle>
                    <DialogDescription>
                        Dompet ini akan dihapus. Transaksi terkait mungkin akan kehilangan referensi dompet.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menghapus...
                            </>
                        ) : (
                            'Hapus'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
