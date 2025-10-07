import type { Eip1193Provider } from "ethers";

interface ExtendedEthereumProvider extends Eip1193Provider {
	isMetaMask?: boolean;
	isCoinbaseWallet?: boolean;
	isBraveWallet?: boolean;
	isPhantom?: boolean;
}

declare global {
	interface Window {
		ethereum?: ExtendedEthereumProvider;
	}

	type TokenInfo = {
		address: string;
		symbol: string;
		decimals: number;
	};

	type TokenBalance = {
		symbol: string;
		balance: string;
	};
}
