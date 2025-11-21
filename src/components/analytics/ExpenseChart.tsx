'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExpenseChart({ data }: { data: any[] }) {
    return (
        <Card className="border-none bg-slate-900/50 backdrop-blur shadow-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400">Pengeluaran 7 Hari Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full min-w-0">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `Rp${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                itemStyle={{ color: '#ef4444' }}
                                formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#ef4444"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
