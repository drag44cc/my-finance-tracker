'use client'

import { deleteCategory } from './actions'
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

export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
    const [open, setOpen] = useState(false)
    const { startLoading, stopLoading, isLoading } = useLoading()

    async function handleDelete() {
        startLoading()
        try {
            await deleteCategory(categoryId)
            setOpen(false)
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Gagal menghapus kategori')
        } finally {
            stopLoading()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-slate-600 hover:text-red-400 transition-colors p-2">
                    <Trash2 className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Hapus Kategori?</DialogTitle>
                    <DialogDescription>
                        Kategori ini akan dihapus permanen. Transaksi terkait akan tetap ada tetapi tanpa kategori.
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
