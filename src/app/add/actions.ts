'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addTransaction(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const amount = parseFloat(formData.get('amount') as string)
    const type = formData.get('type') as string // 'income' or 'expense'
    const categoryId = formData.get('categoryId') as string
    const walletId = formData.get('walletId') as string
    const date = formData.get('date') as string
    const note = formData.get('note') as string

    const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount)

    const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        amount: finalAmount,
        category_id: categoryId,
        wallet_id: walletId,
        date: new Date(date).toISOString(),
        note: note
    })

    if (error) {
        console.error('Error adding transaction:', error)
        redirect('/add?error=Failed to add transaction')
    }

    // Update wallet balance
    const { data: wallet } = await supabase.from('wallets').select('balance').eq('id', walletId).single()
    if (wallet) {
        const newBalance = (wallet.balance || 0) + finalAmount
        await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId)
    }

    revalidatePath('/')
    redirect('/')
}
