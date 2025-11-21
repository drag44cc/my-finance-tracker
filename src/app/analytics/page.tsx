import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ExpenseChart } from '@/components/analytics/ExpenseChart'
import { DateRangePicker } from '@/components/analytics/DateRangePicker'
import { ExportPDFButton } from '@/components/analytics/ExportPDFButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart } from 'lucide-react'

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const params = await searchParams
    const startDate = typeof params.startDate === 'string' ? params.startDate : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
    const endDate = typeof params.endDate === 'string' ? params.endDate : new Date().toISOString()

    // Fetch transactions with date filter
    // Note: We need to fetch category name for the PDF export
    const { data: transactions } = await supabase
        .from('transactions')
        .select('amount, date, note, type:categories(type), category:categories(name)')
        .gte('date', startDate)
        .lte('date', endDate) // Add upper bound if needed, or just rely on start date
        .order('date', { ascending: true })

    // Process data for chart (group by date, filter expenses)
    const chartDataMap = new Map()

    transactions?.forEach(trx => {
        // Only process expenses (negative amounts)
        if (trx.amount < 0) {
            const date = new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
            const currentAmount = chartDataMap.get(date) || 0
            chartDataMap.set(date, currentAmount + Math.abs(trx.amount))
        }
    })

    // Convert Map to Array
    const chartData = Array.from(chartDataMap, ([date, amount]) => ({ date, amount }))

    // Calculate totals
    const totalExpense = transactions?.reduce((acc, curr) => curr.amount < 0 ? acc + Math.abs(curr.amount) : acc, 0) || 0
    const totalIncome = transactions?.reduce((acc, curr) => curr.amount > 0 ? acc + curr.amount : acc, 0) || 0

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <PieChart className="h-6 w-6 text-indigo-500" />
                    Analytics
                </h1>
                <div className="flex flex-wrap items-end gap-2">
                    <DateRangePicker />
                    <ExportPDFButton transactions={transactions || []} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-xs font-medium text-slate-400">Pemasukan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-lg font-bold text-green-400">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalIncome)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-xs font-medium text-slate-400">Pengeluaran</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-lg font-bold text-red-400">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalExpense)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ExpenseChart data={chartData} />

            {/* Future: Add Category Breakdown Pie Chart here */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-400">Insight</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-300">
                        Data ditampilkan dari <span className="font-bold text-white">{new Date(startDate).toLocaleDateString('id-ID')}</span> sampai <span className="font-bold text-white">{new Date(endDate).toLocaleDateString('id-ID')}</span>.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
