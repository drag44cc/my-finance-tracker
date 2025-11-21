'use client'

import { useState } from 'react'
import { useLoading } from '@/components/LoadingProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
import { toast } from 'sonner'

export function AddCategoryDialog() {
    const [open, setOpen] = useState(false)
    const { startLoading, stopLoading, isLoading } = useLoading()

    async function handleSubmit(formData: FormData) {
        startLoading()
        try {
            await addCategory(formData)
            toast.success('✅ Kategori berhasil ditambahkan!')
            setOpen(false)
        } catch (error) {
            console.error('Failed to add category:', error)
            toast.error('❌ Gagal menambahkan kategori.')
        } finally {
            stopLoading()
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
                    <DialogDescription className="text-slate-400">
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
                        <Select name="type" required>
                            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-slate-100">
                                <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 max-w-[calc(100vw-2rem)]">
                                <SelectItem value="expense" className="text-slate-100">Pengeluaran</SelectItem>
                                <SelectItem value="income" className="text-slate-100">Pemasukan</SelectItem>
                            </SelectContent>
                        </Select>
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
