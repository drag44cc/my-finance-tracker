'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addCategory(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const name = formData.get('name') as string
    const type = formData.get('type') as string
    const icon = formData.get('icon') as string
    const color = formData.get('color') as string

    await supabase.from('categories').insert({
        user_id: user.id,
        name,
        type,
        icon,
        color
    })

    revalidatePath('/categories')
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const name = formData.get('name') as string
    const icon = formData.get('icon') as string
    const color = formData.get('color') as string

    await supabase.from('categories').update({
        name,
        icon,
        color
    }).eq('id', id).eq('user_id', user.id)

    revalidatePath('/categories')
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // 1. Unlink transactions
    const { error: transactionError } = await supabase
        .from('transactions')
        .update({ category_id: null })
        .eq('category_id', id)

    if (transactionError) {
        console.error('Error unlinking transactions:', transactionError)
        throw new Error(`Gagal mengupdate transaksi: ${transactionError.message}`)
    }

    // 2. Delete budgets
    const { error: budgetError } = await supabase
        .from('budgets')
        .delete()
        .eq('category_id', id)

    if (budgetError) {
        // Ignore if table doesn't exist (code 42P01 is undefined_table in Postgres)
        if (budgetError.code !== '42P01') {
            console.error('Error deleting budgets:', budgetError)
            throw new Error(`Gagal menghapus budget: ${budgetError.message}`)
        }
    }

    // 3. Delete category
    const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

    if (deleteError) {
        console.error('Error deleting category:', deleteError)
        throw new Error(`Gagal menghapus kategori: ${deleteError.message}`)
    }

    revalidatePath('/categories')
}
