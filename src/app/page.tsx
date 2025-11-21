import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'
import { TransactionItem } from '@/components/transactions/TransactionItem'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch Wallets to calculate total balance
  const { data: wallets } = await supabase.from('wallets').select('balance')
  const totalBalance = wallets?.reduce((acc, curr) => acc + (curr.balance || 0), 0) || 0

  // Fetch Recent Transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      *,
      categories (name, icon, type)
    `)
    .order('date', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      <Header user={user} />

      <div className="px-4 space-y-6">
        {/* Total Balance Card */}
        <Card className="border-none bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-100">Total Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalBalance)}
            </div>
            <div className="mt-2 flex items-center text-xs text-indigo-100">
              <span className="flex items-center rounded-full bg-white/20 px-2 py-0.5 text-white">
                <ArrowUpRight className="mr-1 h-3 w-3" /> +0%
              </span>
              <span className="ml-2">vs bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 px-2">
          <Link href="/add" className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 transition active:scale-95 hover:bg-indigo-700">
              <ArrowDownRight className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-slate-300">Tambah Transaksi</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400 ring-1 ring-slate-700 transition active:scale-95 hover:bg-slate-700 hover:text-slate-200">
              <MoreHorizontal className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-slate-400">Lainnya</span>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Transaksi Terakhir</h2>
            <Link href="/transactions" className="text-xs text-indigo-400 hover:text-indigo-300">Lihat Semua</Link>
          </div>

          <div className="space-y-3">
            {transactions?.length === 0 ? (
              <p className="text-center text-sm text-slate-500 py-4">Belum ada transaksi.</p>
            ) : (
              transactions?.map((trx) => (
                <TransactionItem key={trx.id} trx={trx} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
