'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRecentActivity() {
            const supabase = createClient()
            const { data } = await supabase
                .from('transactions')
                .select(`
                    id,
                    amount,
                    date,
                    categories (name, icon, type)
                `)
                .order('date', { ascending: false })
                .limit(3)

            if (data) {
                setNotifications(data)
            }
            setLoading(false)
        }

        fetchRecentActivity()
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-800 text-slate-100">
                <DropdownMenuLabel>Aktivitas Terbaru</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                {loading ? (
                    <div className="p-4 text-center text-xs text-slate-500">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">Belum ada aktivitas</div>
                ) : (
                    notifications.map((notif) => (
                        <DropdownMenuItem key={notif.id} className="cursor-pointer focus:bg-slate-800 focus:text-slate-100">
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-lg">
                                    {notif.categories?.icon || '📝'}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-medium">
                                        {notif.categories?.name || 'Transaksi'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(notif.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </p>
                                </div>
                                <div className={`text-xs font-bold ${notif.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(notif.amount)}
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-800 focus:text-slate-100 justify-center text-indigo-400">
                    <Link href="/transactions">Lihat Semua</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
