'use client'

import { deleteTransaction } from '@/app/actions/transaction'
import { Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export function DeleteTransactionDialog({ transactionId }: { transactionId: string }) {
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        setIsDeleting(true)
        try {
            await deleteTransaction(transactionId)
            setOpen(false)
            // Router refresh is usually handled by the server action revalidatePath, 
            // but we can also force a refresh here if needed.
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Gagal menghapus transaksi')
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-red-400"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Hapus Transaksi?</DialogTitle>
                    <DialogDescription>
                        Transaksi ini akan dihapus permanen dari riwayat Anda.
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
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isDeleting ? (
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
