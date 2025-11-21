'use client'

import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Transaction {
    date: string
    amount: number
    type: { type: string } | null
    category?: { name: string }
    note?: string
}

export function ExportPDFButton({ transactions }: { transactions: any[] }) {
    const handleExport = () => {
        const doc = new jsPDF()

        // Title
        doc.setFontSize(18)
        doc.text('Laporan Keuangan', 14, 22)
        doc.setFontSize(11)
        doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 30)

        // Table
        const tableData = transactions.map(t => [
            new Date(t.date).toLocaleDateString('id-ID'),
            t.type?.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            t.category?.name || '-',
            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Math.abs(t.amount)),
            t.note || '-'
        ])

        autoTable(doc, {
            head: [['Tanggal', 'Tipe', 'Kategori', 'Jumlah', 'Catatan']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [79, 70, 229] } // Indigo-600
        })

        doc.save('laporan-keuangan.pdf')
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2"
            onClick={handleExport}
        >
            <FileDown className="h-4 w-4" />
            Export PDF
        </Button>
    )
}
