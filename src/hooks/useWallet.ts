"use client";

import { useState, useCallback } from "react";
import { ethers, Network } from "ethers";

export const useWallet = () => {
	const [address, setAddress] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [walletName, setWalletName] = useState<string | null>(null);
	const [network, setNetwork] = useState<Network | null>(null);

	const connectWallet = useCallback(async () => {
		if (!window.ethereum) {
			console.error("No wallet detected");
			return;
		}

		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const accounts: string[] = await provider.send("eth_requestAccounts", []);
			const selectedAccount = accounts[0];
			setAddress(selectedAccount);

			const balance = await provider.getBalance(selectedAccount);
			setBalance(`${ethers.formatEther(balance)} ETH`);

			const wallet = detectWallet();
			setWalletName(wallet);

			const network = await provider.getNetwork();
			setNetwork(network);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const resetWallet = useCallback(() => {
		setAddress(null);
		setBalance(null);
		setWalletName(null);
		setNetwork(null);
	}, []);

	const detectWallet = () => {
		const ethereum = window.ethereum;

		if (!ethereum) return "No Wallet";

		if ((ethereum as any).isMetaMask) return "MetaMask";
		if ((ethereum as any).isCoinbaseWallet) return "Coinbase Wallet";
		if ((ethereum as any).isBraveWallet) return "Brave Wallet";
		if ((ethereum as any).isPhantom) return "Phantom";

		return "Unknown Wallet";
	};

	return {
		address,
		balance,
		walletName,
		network,
		connectWallet,
		resetWallet,
	};
};
