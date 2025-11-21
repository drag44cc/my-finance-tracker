'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateTransaction(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const amount = parseFloat(formData.get('amount') as string)
    const type = formData.get('type') as string
    const categoryId = formData.get('categoryId') as string
    const walletId = formData.get('walletId') as string
    const date = formData.get('date') as string
    const note = formData.get('note') as string

    // Calculate difference for wallet balance update
    // 1. Get old transaction
    const { data: oldTrx } = await supabase.from('transactions').select('amount, wallet_id').eq('id', id).single()

    if (!oldTrx) throw new Error('Transaction not found')

    const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount)

    // 2. Update transaction
    const { error } = await supabase.from('transactions').update({
        amount: finalAmount,
        category_id: categoryId,
        wallet_id: walletId,
        date: new Date(date).toISOString(),
        note: note
    }).eq('id', id)

    if (error) {
        console.error('Error updating transaction:', error)
        redirect(`/edit/${id}?error=Failed to update`)
    }

    // 3. Update Wallet Balance
    // Revert old amount from old wallet
    const { data: oldWallet } = await supabase.from('wallets').select('balance').eq('id', oldTrx.wallet_id).single()
    if (oldWallet) {
        await supabase.from('wallets').update({ balance: (oldWallet.balance || 0) - oldTrx.amount }).eq('id', oldTrx.wallet_id)
    }

    // Add new amount to new wallet (even if same wallet)
    const { data: newWallet } = await supabase.from('wallets').select('balance').eq('id', walletId).single()
    if (newWallet) {
        await supabase.from('wallets').update({ balance: (newWallet.balance || 0) + finalAmount }).eq('id', walletId)
    }

    revalidatePath('/')
    redirect('/')
}
