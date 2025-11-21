'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function transferMoney(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const fromWalletId = formData.get('fromWalletId') as string
    const toWalletId = formData.get('toWalletId') as string
    const amount = parseFloat(formData.get('amount') as string)
    const note = formData.get('note') as string

    if (!fromWalletId || !toWalletId || !amount || fromWalletId === toWalletId) {
        return
    }

    // Deduct from source wallet
    const { data: fromWallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('id', fromWalletId)
        .single()

    if (fromWallet) {
        await supabase
            .from('wallets')
            .update({ balance: fromWallet.balance - amount })
            .eq('id', fromWalletId)
    }

    // Add to destination wallet
    const { data: toWallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('id', toWalletId)
        .single()

    if (toWallet) {
        await supabase
            .from('wallets')
            .update({ balance: toWallet.balance + amount })
            .eq('id', toWalletId)
    }

    // Optionally, create transaction records for tracking
    // You could create two transactions: one expense from source, one income to destination

    revalidatePath('/wallet')
    revalidatePath('/')
    redirect('/')
}
