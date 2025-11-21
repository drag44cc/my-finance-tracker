import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addCategory } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Tag } from 'lucide-react'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { AddCategoryDialog } from './AddCategoryDialog'

export default async function CategoriesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Fetch all categories
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .order('type', { ascending: false })
        .order('name', { ascending: true })

    const incomeCategories = categories?.filter(c => c.type === 'income') || []
    const expenseCategories = categories?.filter(c => c.type === 'expense') || []

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Tag className="h-6 w-6 text-indigo-500" />
                    Kategori
                </h1>

                <AddCategoryDialog />
            </div>

            {/* Income Categories */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                    💰 Pemasukan
                </h2>
                {incomeCategories.length === 0 ? (
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-center py-6">
                        <CardContent>
                            <p className="text-slate-500 text-sm">Belum ada kategori pemasukan.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3">
                        {incomeCategories.map((category) => (
                            <Card key={category.id} className="border-slate-800 bg-slate-900/50 backdrop-blur">
                                <CardContent className="py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{category.icon || '📄'}</span>
                                        <div>
                                            <p className="font-medium text-slate-100">{category.name}</p>
                                            {category.color && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div
                                                        className="w-4 h-4 rounded-full border border-slate-700"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <span className="text-xs text-slate-500">{category.color}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <DeleteCategoryButton categoryId={category.id} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Expense Categories */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                    💸 Pengeluaran
                </h2>
                {expenseCategories.length === 0 ? (
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-center py-6">
                        <CardContent>
                            <p className="text-slate-500 text-sm">Belum ada kategori pengeluaran.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3">
                        {expenseCategories.map((category) => (
                            <Card key={category.id} className="border-slate-800 bg-slate-900/50 backdrop-blur">
                                <CardContent className="py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{category.icon || '📄'}</span>
                                        <div>
                                            <p className="font-medium text-slate-100">{category.name}</p>
                                            {category.color && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div
                                                        className="w-4 h-4 rounded-full border border-slate-700"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <span className="text-xs text-slate-500">{category.color}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <DeleteCategoryButton categoryId={category.id} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
