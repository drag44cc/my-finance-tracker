'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogoutDialog } from './LogoutDialog'
import { NotificationDropdown } from './NotificationDropdown'

export function Header({ user }: { user: any }) {
    // Get initials from email or name
    const initials = user?.email?.substring(0, 2).toUpperCase() || 'U'

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-lg">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-slate-700">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-slate-800 text-slate-200">{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-xs text-slate-400">Selamat Datang,</p>
                    <p className="text-sm font-semibold text-slate-100">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <NotificationDropdown />
                <LogoutDialog />
            </div>
        </header>
    )
}
