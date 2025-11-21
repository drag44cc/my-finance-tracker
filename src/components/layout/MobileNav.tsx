'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PieChart, Plus, Wallet, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
    const pathname = usePathname()

    if (pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
        return null
    }

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/analytics', icon: PieChart, label: 'Analytics' },
        { href: '/add', icon: Plus, label: 'Add', isFab: true },
        { href: '/wallet', icon: Wallet, label: 'Wallet' },
        { href: '/budget', icon: PieChart, label: 'Budget' },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/80 backdrop-blur-lg pb-safe">
            <div className="flex h-16 items-center justify-around px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    if (item.isFab) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-transform active:scale-95"
                            >
                                <item.icon className="h-6 w-6" />
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
                                isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
