import { useState } from "react";
import { ethers, Network } from "ethers";
import { Button } from "./components/Button";
import clsx from "clsx";

export const App = () => {
	const [address, setAddress] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [wallet, setWallet] = useState<string | null>(null);
	const [network, setNetwork] = useState<Network | null>(null);

	const connectWallet = async () => {
		if (!window.ethereum) {
			console.error("No wallet detected.");
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
			setWallet(wallet);

			const network = await provider.getNetwork();
			setNetwork(network);
		} catch (error) {
			console.error(error);
		}
	};

	const detectWallet = (): string => {
		const ethereum = window.ethereum;

		if (!ethereum) return "No Wallet";

		if ((ethereum as any).isMetaMask) return "MetaMask";
		if ((ethereum as any).isCoinbaseWallet) return "Coinbase Wallet";
		if ((ethereum as any).isBraveWallet) return "Brave Wallet";
		if ((ethereum as any).isPhantom) return "Phantom";

		return "Unknown Wallet";
	};

	const shortenAddress = (address: string | null) =>
		address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";

	const reset = () => {
		setAddress(null);
		setBalance(null);
		setWallet(null);
		setNetwork(null);
	};

	return (
		<div className="flex h-screen w-full items-center justify-center bg-neutral-900 text-white">
			<div
				className={clsx(
					"flex w-full max-w-md flex-col gap-4 rounded-xl bg-neutral-800 p-6 shadow-lg"
					// "duration-150 hover:scale-110"
				)}
			>
				<p className="text-center text-3xl font-bold">Web3 Mini App</p>

				<div className="flex flex-row justify-center gap-3">
					<Button onClick={connectWallet} disabled={address !== null} color="green">
						{address ? "Connected" : "Connect"}
					</Button>
					<Button onClick={reset} disabled={address === null} color="red">
						Reset
					</Button>
				</div>

				<div className="flex flex-col gap-2 rounded bg-neutral-700 p-4 shadow">
					<p>
						<span className="font-semibold">Wallet:</span>{" "}
						{address ? (wallet ?? "-") : "-"}
					</p>
					<p>
						<span className="font-semibold">Account:</span>{" "}
						{address ? shortenAddress(address) : "-"}
					</p>
					<p>
						<span className="font-semibold">Balance:</span>{" "}
						{address ? (balance ?? "-") : "-"}
					</p>
					<p>
						<span className="font-semibold">Network:</span>{" "}
						{address ? `${network?.name ?? "-"} (${network?.chainId ?? "-"})` : "-"}
					</p>
				</div>
			</div>
		</div>
	);
};
