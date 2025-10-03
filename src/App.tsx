import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "./components/Button";

export const App = () => {
	const [address, setAddress] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);

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
			setBalance(ethers.formatEther(balance));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex h-full w-full max-w-3xl flex-col gap-3 p-5">
				<div className="text-3xl">Mini Web3 App</div>
				<div className="flex h-full w-full flex-col">
					{address ? (
						<div>
							<p>Address: {address}</p>
							<p>Balance: {balance} ETH</p>
						</div>
					) : (
						<Button onClick={connectWallet}>Connect Wallet</Button>
					)}
				</div>
			</div>
		</div>
	);
};
