import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { TransactionItem } from '@/components/transactions/TransactionItem'
import { Button } from '@/components/ui/button'
import { FilterControls } from './FilterControls'

export default async function TransactionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; month?: string; year?: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const params = await searchParams
    const page = Number(params.page) || 1
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1 // 1-12

    const selectedYear = Number(params.year) || currentYear
    const selectedMonth = Number(params.month) || currentMonth

    const pageSize = 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    // Calculate start and end date for the selected month
    const startDate = new Date(selectedYear, selectedMonth - 1, 1).toISOString()
    const endDate = new Date(selectedYear, selectedMonth, 0, 23, 59, 59).toISOString()

    // Fetch Transactions with Pagination and Filtering
    const { data: transactions, count } = await supabase
        .from('transactions')
        .select(`
      *,
      categories (name, icon, type)
    `, { count: 'exact' })
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false })
        .range(from, to)

    const totalPages = count ? Math.ceil(count / pageSize) : 1
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/" className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl font-bold text-slate-100">Semua Transaksi</h1>
            </div>

            <FilterControls currentMonth={selectedMonth} currentYear={selectedYear} />

            <div className="space-y-3">
                {transactions?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-slate-500">Belum ada transaksi di bulan ini.</p>
                        <Link href="/add" className="mt-4 text-sm text-indigo-400 hover:text-indigo-300">
                            Tambah Transaksi Baru
                        </Link>
                    </div>
                ) : (
                    transactions?.map((trx) => (
                        <TransactionItem key={trx.id} trx={trx} />
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {count && count > 0 && (
                <div className="flex items-center justify-between pt-4">
                    <div className="text-xs text-slate-500">
                        Halaman {page} dari {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/transactions?page=${page - 1}&month=${selectedMonth}&year=${selectedYear}`} className={!hasPrevPage ? 'pointer-events-none opacity-50' : ''}>
                            <Button variant="outline" size="sm" disabled={!hasPrevPage} className="border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Sebelumnya
                            </Button>
                        </Link>
                        <Link href={`/transactions?page=${page + 1}&month=${selectedMonth}&year=${selectedYear}`} className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}>
                            <Button variant="outline" size="sm" disabled={!hasNextPage} className="border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                                Selanjutnya
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
