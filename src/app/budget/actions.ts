'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function setBudget(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const categoryId = formData.get('categoryId') as string
    const amount = parseFloat(formData.get('amount') as string)

    // Check if budget exists for this category
    const { data: existingBudget } = await supabase
        .from('budgets')
        .select('id')
        .eq('category_id', categoryId)
        .single()

    let error
    if (existingBudget) {
        const { error: updateError } = await supabase
            .from('budgets')
            .update({ amount })
            .eq('id', existingBudget.id)
        error = updateError
    } else {
        const { error: insertError } = await supabase
            .from('budgets')
            .insert({
                user_id: user.id,
                category_id: categoryId,
                amount
            })
        error = insertError
    }

    if (error) {
        console.error('Error setting budget:', error)
        redirect('/budget?error=Failed to set budget')
    }

    revalidatePath('/budget')
}

export async function deleteBudget(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('budgets').delete().eq('id', id)

    if (error) {
        console.error('Error deleting budget:', error)
        throw new Error('Failed to delete budget')
    }

    revalidatePath('/budget')
}
