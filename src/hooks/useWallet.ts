"use client";

import { useState, useCallback } from "react";
import { BrowserProvider, ethers, JsonRpcSigner, Network } from "ethers";
import { getAllTokenBalances } from "@/utils/getAllTokenBalances";

export const TOKENS = [
	{
		address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
		symbol: "DAI",
		decimals: 18,
	},
	{
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		symbol: "USDC",
		decimals: 6,
	},
	{
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		symbol: "USDT",
		decimals: 6,
	},
];

export const useWallet = () => {
	const [provider, setProvider] = useState<BrowserProvider | null>(null);
	const [account, setAccount] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
	const [walletName, setWalletName] = useState<string | null>(null);
	const [chain, setChain] = useState<Network | null>(null);
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

	const connectWallet = useCallback(async () => {
		if (!window.ethereum) {
			console.error("No wallet detected");
			return;
		}

		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			setProvider(provider);

			const accounts: string[] = await provider.send(
				"eth_requestAccounts",
				[],
			);
			const account = accounts[0];
			setAccount(account);

			const balance = await provider.getBalance(account);
			setBalance(`${ethers.formatEther(balance)} ETH`);

			const walletName = detectWalletName();
			setWalletName(walletName);

			const chain = await provider.getNetwork();
			setChain(chain);

			const signer = await provider.getSigner();
			setSigner(signer);

			const tokenBalances = await getAllTokenBalances(
				provider,
				account,
				TOKENS,
			);
			setTokenBalances(tokenBalances);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const resetWallet = () => {
		setAccount(null);
		setBalance(null);
		setWalletName(null);
		setChain(null);
	};

	const detectWalletName = () => {
		const ethereum = window.ethereum;

		if (!ethereum) return "No Wallet";

		if (ethereum.isMetaMask) return "MetaMask";
		if (ethereum.isCoinbaseWallet) return "Coinbase Wallet";
		if (ethereum.isBraveWallet) return "Brave Wallet";
		if (ethereum.isPhantom) return "Phantom";

		return "Unknown Wallet";
	};

	return {
		provider,
		account,
		balance,
		tokenBalances,
		walletName,
		chain,
		signer,
		connectWallet,
		resetWallet,
	};
};
