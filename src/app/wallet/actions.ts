'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addWallet(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const name = formData.get('name') as string
    const balance = parseFloat(formData.get('balance') as string)

    const { error } = await supabase.from('wallets').insert({
        user_id: user.id,
        name,
        type: 'general', // Default type
        balance,
        icon: '💰'
    })

    if (error) {
        console.error('Error adding wallet:', error)
        redirect('/wallet?error=Failed to add wallet')
    }

    revalidatePath('/wallet')
    revalidatePath('/')
}

export async function updateWallet(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const name = formData.get('name') as string
    const balance = parseFloat(formData.get('balance') as string)

    const { error } = await supabase.from('wallets').update({
        name,
        balance
    }).eq('id', id).eq('user_id', user.id)

    if (error) {
        console.error('Error updating wallet:', error)
        throw new Error('Failed to update wallet')
    }

    revalidatePath('/wallet')
    revalidatePath('/')
}

export async function deleteWallet(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('wallets').delete().eq('id', id)

    if (error) {
        console.error('Error deleting wallet:', error)
        throw new Error('Failed to delete wallet')
    }

    revalidatePath('/wallet')
    revalidatePath('/')
}
