import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './LoginForm'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const error = typeof params.error === 'string' ? params.error : undefined
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-w-[400px] border-slate-800 bg-slate-900/50 backdrop-blur text-slate-100">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Masuk untuk mengelola keuangan Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <LoginForm error={error} />
                </CardContent>
            </Card>
        </div>
    )
}
