import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { setBudget } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AmountInput } from '@/components/ui/AmountInput'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target, Plus } from 'lucide-react'
import { DeleteBudgetButton } from './DeleteBudgetButton'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default async function BudgetPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch budgets
    const { data: budgets } = await supabase
        .from('budgets')
        .select('*, categories(name, icon)')
        .order('created_at', { ascending: false })

    // Fetch categories for dropdown
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('type', 'expense')

    // Fetch current month expenses to calculate progress
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { data: expenses } = await supabase
        .from('transactions')
        .select('amount, category_id')
        .gte('date', startOfMonth.toISOString())
        .lt('amount', 0)

    // Calculate spent per category
    const spentMap = new Map()
    expenses?.forEach(exp => {
        const current = spentMap.get(exp.category_id) || 0
        spentMap.set(exp.category_id, current + Math.abs(exp.amount))
    })

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Target className="h-6 w-6 text-indigo-500" />
                    Budget Bulanan
                </h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Plus className="h-4 w-4 mr-1" /> Set Budget
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Atur Budget</DialogTitle>
                            <DialogDescription>
                                Tentukan batas pengeluaran untuk setiap kategori.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={setBudget} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="categoryId">Kategori</Label>
                                <Select name="categoryId" required>
                                    <SelectTrigger className="bg-slate-950 border-slate-800">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                        {categories?.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Batas Maksimal (Rp)</Label>
                                <AmountInput name="amount" placeholder="0" className="bg-slate-950 border-slate-800" required />
                            </div>
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Simpan</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {budgets?.length === 0 ? (
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-center py-8">
                        <CardContent>
                            <p className="text-slate-500">Belum ada budget yang diatur.</p>
                        </CardContent>
                    </Card>
                ) : (
                    budgets?.map((budget) => {
                        const spent = spentMap.get(budget.category_id) || 0
                        const percentage = Math.min((spent / budget.amount) * 100, 100)
                        const isOverBudget = spent > budget.amount

                        return (
                            <Card key={budget.id} className="border-slate-800 bg-slate-900/50 backdrop-blur">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                            <span>{budget.categories?.icon}</span>
                                            {budget.categories?.name}
                                        </CardTitle>
                                        <DeleteBudgetButton budgetId={budget.id} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className={isOverBudget ? "text-red-400 font-bold" : "text-slate-100"}>
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(spent)}
                                        </span>
                                        <span className="text-slate-500">
                                            / {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budget.amount)}
                                        </span>
                                    </div>
                                    <Progress value={percentage} className={`h-2 ${isOverBudget ? "[&>*]:bg-red-500" : percentage > 80 ? "[&>*]:bg-yellow-500" : "[&>*]:bg-green-500"}`} />
                                    {isOverBudget && (
                                        <p className="text-xs text-red-400 mt-2">Melebihi budget!</p>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
