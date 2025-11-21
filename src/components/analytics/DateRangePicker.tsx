'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function DateRangePicker() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.push('?' + createQueryString('startDate', e.target.value))
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.push('?' + createQueryString('endDate', e.target.value))
    }

    return (
        <div className="flex gap-2 items-end">
            <div className="grid gap-1.5">
                <Label htmlFor="start-date" className="text-xs text-slate-400">Dari</Label>
                <Input
                    id="start-date"
                    type="date"
                    className="h-8 w-[130px] bg-slate-900 border-slate-800 text-xs"
                    defaultValue={searchParams.get('startDate') || ''}
                    onChange={handleStartDateChange}
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="end-date" className="text-xs text-slate-400">Sampai</Label>
                <Input
                    id="end-date"
                    type="date"
                    className="h-8 w-[130px] bg-slate-900 border-slate-800 text-xs"
                    defaultValue={searchParams.get('endDate') || ''}
                    onChange={handleEndDateChange}
                />
            </div>
        </div>
    )
}
