'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FilterControls({ currentMonth, currentYear }: { currentMonth: number; currentYear: number }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const months = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' },
    ]

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

    const handleFilterChange = (key: 'month' | 'year', value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value)
        params.set('page', '1') // Reset to page 1 when filter changes
        router.push(`/transactions?${params.toString()}`)
    }

    return (
        <div className="flex gap-3">
            <Select value={currentMonth.toString()} onValueChange={(val) => handleFilterChange('month', val)}>
                <SelectTrigger className="w-[140px] bg-slate-900 border-slate-800 text-slate-200">
                    <SelectValue placeholder="Bulan" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    {months.map((m) => (
                        <SelectItem key={m.value} value={m.value.toString()}>
                            {m.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={currentYear.toString()} onValueChange={(val) => handleFilterChange('year', val)}>
                <SelectTrigger className="w-[100px] bg-slate-900 border-slate-800 text-slate-200">
                    <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    {years.map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
