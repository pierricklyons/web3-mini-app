"use client";

import { useState, useCallback } from "react";
import { BrowserProvider, ethers, JsonRpcSigner, Network } from "ethers";

export const useWallet = () => {
	const [provider, setProvider] = useState<BrowserProvider | null>(null);
	const [account, setAccount] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
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
		} catch (err) {
			console.error(err);
		}
	}, []);

	const resetWallet = useCallback(() => {
		setAccount(null);
		setBalance(null);
		setWalletName(null);
		setChain(null);
	}, []);

	const detectWalletName = (): string => {
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
		walletName,
		chain,
		signer,
		connectWallet,
		resetWallet,
	};
};
