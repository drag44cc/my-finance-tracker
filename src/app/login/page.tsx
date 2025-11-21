import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './LoginForm'
import { Wallet } from 'lucide-react'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const error = typeof params.error === 'string' ? params.error : undefined
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
            <div className="w-full max-w-[400px] space-y-6">
                {/* Welcome Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30">
                            <Wallet className="h-12 w-12 text-indigo-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-100">Selamat Datang</h1>
                    <p className="text-slate-400">di aplikasi <span className="text-indigo-400 font-semibold">Duitku Berkah</span></p>
                </div>

                {/* Login Card */}
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-100">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription className="text-slate-400">Masuk untuk mengelola keuangan Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LoginForm error={error} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
