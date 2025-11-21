'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { addCategory } from './actions'

export function AddCategoryDialog() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            await addCategory(formData)
            setOpen(false) // Auto-close on success
        } catch (error) {
            console.error('Failed to add category:', error)
            // Optionally handle error (e.g., show toast)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Tambah Kategori</DialogTitle>
                    <DialogDescription>
                        Buat kategori baru untuk mengorganisir transaksi Anda.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Contoh: Makanan"
                            className="bg-slate-950 border-slate-800"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Tipe</Label>
                        <select
                            id="type"
                            name="type"
                            className="w-full h-10 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        >
                            <option value="expense">Pengeluaran</option>
                            <option value="income">Pemasukan</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input
                            id="icon"
                            name="icon"
                            placeholder="🍔"
                            className="bg-slate-950 border-slate-800 text-2xl"
                            maxLength={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="color">Warna (Opsional)</Label>
                        <Input
                            id="color"
                            name="color"
                            type="color"
                            defaultValue="#6366f1"
                            className="bg-slate-950 border-slate-800 h-12"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
