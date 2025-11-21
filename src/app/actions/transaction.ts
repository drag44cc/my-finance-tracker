'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteTransaction(id: string) {
    const supabase = await createClient()

    // First, get the transaction details to update wallet balance
    const { data: transaction } = await supabase
        .from('transactions')
        .select('amount, wallet_id')
        .eq('id', id)
        .single()

    if (transaction && transaction.wallet_id) {
        // Get current wallet balance
        const { data: wallet } = await supabase
            .from('wallets')
            .select('balance')
            .eq('id', transaction.wallet_id)
            .single()

        if (wallet) {
            // Reverse the transaction: subtract the amount from wallet
            // If transaction.amount was negative (expense), subtracting it will add back to balance
            // If transaction.amount was positive (income), subtracting it will reduce the balance
            const newBalance = wallet.balance - transaction.amount

            await supabase
                .from('wallets')
                .update({ balance: newBalance })
                .eq('id', transaction.wallet_id)
        }
    }

    // Delete the transaction
    const { error } = await supabase.from('transactions').delete().eq('id', id)

    if (error) {
        console.error('Error deleting transaction:', error)
        throw new Error('Failed to delete transaction')
    }

    revalidatePath('/')
    revalidatePath('/wallet')
}
