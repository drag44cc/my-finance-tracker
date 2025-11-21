'use client'

import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                'Login'
            )}
        </Button>
    )
}

export function LoginForm({ error }: { error?: string }) {
    return (
        <form action={login} className="space-y-4">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-sm text-red-400">
                    {error}
                </div>
            )}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required className="bg-slate-950 border-slate-800" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required className="bg-slate-950 border-slate-800" />
            </div>
            <SubmitButton />
        </form>
    )
}
