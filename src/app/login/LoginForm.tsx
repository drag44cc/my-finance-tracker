'use client';

import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoading } from '@/components/LoadingProvider';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LoginForm({ error }: { error?: string }) {
    const { startLoading, stopLoading, isLoading } = useLoading();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startLoading();

        try {
            const formData = new FormData(e.currentTarget);
            await login(formData);
            router.refresh();
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            stopLoading();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-sm text-red-400">
                    {error}
                </div>
            )}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoading}
                    className="bg-slate-950 border-slate-800"
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                    className="bg-slate-950 border-slate-800"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    'Login'
                )}
            </Button>
        </form>
    );
}
