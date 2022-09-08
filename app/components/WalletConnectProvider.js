import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {
    GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter
} from "@solana/wallet-adapter-wallets";
import clusterApiUrl from "@solana/web3.js";
import {useMemo} from "react";

export const WalletConnectProvider = ({children}) => {
    const network = WalletAdapterNetwork.Devnet

    const endpoint = useMemo(() => {
        if (network === WalletAdapterNetwork.Devnet) {
            return 'https://warmhearted-greatest-log.solana-devnet.discover.quiknode.pro/f6ee29d7237ccb60936d7ca74ca0322d158f29ab/'
        }
        return clusterApiUrl(network)
    }, [network])
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
    return (<ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>)
}