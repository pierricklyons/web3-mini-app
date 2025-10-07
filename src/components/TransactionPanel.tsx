"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWalletContext } from "@/context/WalletContext";
import { Button } from "./Button";

export const TransactionPanel = () => {
	const { provider, account, signer } = useWalletContext();
	const [recipientAccount, setRecipientAcount] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [status, setStatus] = useState<string>("");

	const sendETH = async () => {
		if (!provider || !account || !signer) {
			setStatus("Please connect your wallet first.");
			return;
		}

		if (!ethers.isAddress(recipientAccount)) {
			setStatus("Invalid receiver address.");
			return;
		}

		if (!amount || isNaN(Number(amount))) {
			setStatus("Enter a valid amount.");
			return;
		}

		try {
			const tx = await signer.sendTransaction({
				to: recipientAccount,
				value: ethers.parseEther(amount),
			});
			setStatus("Transaction sent!");
			await tx.wait();
			setStatus("Transaction confirmed!");
			(setAmount(""), setRecipientAcount(""));
		} catch (error: unknown) {
			console.error(error);
			setStatus("Transaction failed, check console.");
		}
	};

	return (
		<>
			<input
				className="rounded bg-neutral-600 p-3 text-white focus:outline-none"
				type="text"
				placeholder="Recipient address"
				value={recipientAccount}
				onChange={(e) => setRecipientAcount(e.target.value)}
			/>
			<input
				className="rounded bg-neutral-600 p-3 text-white focus:outline-none"
				type="text"
				placeholder="Amount (ETH)"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
			/>
			<Button
				className="self-center"
				onClick={sendETH}
				disabled={!account || !amount}
				color="yellow"
			>
				Send
			</Button>
			<p>
				<span className="font-semibold">Status:</span> {status}
			</p>
		</>
	);
};
