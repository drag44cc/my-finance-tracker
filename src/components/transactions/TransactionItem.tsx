'use client'

import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { DeleteTransactionDialog } from './DeleteTransactionDialog'

export function TransactionItem({ trx }: { trx: any }) {
    const router = useRouter()

    return (
        <div className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-3 backdrop-blur transition-all hover:bg-slate-800/50">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xl">
                    {trx.categories?.icon || '📄'}
                </div>
                <div>
                    <p className="font-medium text-slate-200">{trx.categories?.name || 'Tanpa Kategori'}</p>
                    <p className="text-xs text-slate-500">
                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={trx.amount < 0 ? "font-semibold text-red-400" : "font-semibold text-green-400"}>
                    {trx.amount < 0 ? '-' : '+'}
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Math.abs(trx.amount))}
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-indigo-400"
                    onClick={() => router.push(`/edit/${trx.id}`)}
                >
                    <Pencil className="h-3 w-3" />
                </Button>
                <DeleteTransactionDialog transactionId={trx.id} />
            </div>
        </div>
    )
}
