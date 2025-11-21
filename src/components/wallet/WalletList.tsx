import { Card, CardContent } from '@/components/ui/card'
import { EditWalletDialog } from '@/app/wallet/EditWalletDialog'
import { DeleteWalletButton } from '@/app/wallet/DeleteWalletButton'

export function WalletList({ wallets }: { wallets: any[] }) {
    return (
        <>
            {wallets.map((wallet) => (
                <Card key={wallet.id} className="border-slate-800 bg-slate-900/50 backdrop-blur group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-2xl">
                                {wallet.icon || '💰'}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-100">{wallet.name}</h3>
                                <p className="text-xs text-slate-500">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(wallet.balance)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <EditWalletDialog wallet={wallet} />
                            <DeleteWalletButton walletId={wallet.id} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
