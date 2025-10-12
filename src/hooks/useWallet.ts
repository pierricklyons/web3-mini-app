"use client";

import { useState } from "react";
import {
	BrowserProvider,
	formatEther,
	JsonRpcSigner,
	Network,
	Provider,
	Signer,
} from "ethers";
import { getTokenBalance } from "@/utils/getTokenBalance";
import { TEST_TOKENS } from "@/constants/tokens";
import { Address, parseAddress } from "@/types/Address";

export const useWallet = () => {
	const [provider, setProvider] = useState<BrowserProvider | null>(null);
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
	const [account, setAccount] = useState<Address | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
	const [walletName, setWalletName] = useState<string | null>(null);
	const [chain, setChain] = useState<Network | null>(null);

	const detectWalletName = (): string => {
		const ethereum = window.ethereum;

		if (!ethereum) return "No Wallet";
		if (ethereum.isMetaMask) return "MetaMask";
		if (ethereum.isCoinbaseWallet) return "Coinbase Wallet";
		if (ethereum.isBraveWallet) return "Brave Wallet";
		if (ethereum.isPhantom) return "Phantom";

		return "Unknown Wallet";
	};

	const getTokenBalances = async (
		provider: Provider | Signer,
		userAddress: string,
		tokens: Token[],
	): Promise<TokenBalance[]> => {
		return Promise.all(
			tokens.map((token) =>
				getTokenBalance(provider, userAddress, token),
			),
		);
	};

	const connectWallet = async (): Promise<void> => {
		if (!window.ethereum) {
			console.error("No wallet detected");
			return;
		}

		try {
			const provider = new BrowserProvider(window.ethereum, "any");
			setProvider(provider);

			const [account] = await provider.send("eth_requestAccounts", []);
			setAccount(parseAddress(account));

			const balanceWei = await provider.getBalance(account);
			setBalance(`${formatEther(balanceWei)} ETH`);

			setWalletName(detectWalletName());

			const network = await provider.getNetwork();
			setChain(network);

			const signer = await provider.getSigner();
			setSigner(signer);

			const tokenBalances = await getTokenBalances(
				provider,
				account,
				TEST_TOKENS,
			);
			setTokenBalances(tokenBalances);
		} catch (error) {
			console.error("Error connecting wallet:", error);
		}
	};

	const resetWallet = (): void => {
		setAccount(null);
		setBalance(null);
		setWalletName(null);
		setChain(null);
		setSigner(null);
		setProvider(null);
		setTokenBalances([]);
	};

	return {
		provider,
		signer,
		account,
		balance,
		tokenBalances,
		walletName,
		chain,
		connectWallet,
		resetWallet,
	};
};
