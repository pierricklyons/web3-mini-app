"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWalletContext } from "@/context/WalletContext";
import { Button } from "./Button";
import { sendEth } from "@/utils/sendEth";

export const TransactionPanel = () => {
	const { provider, account, signer } = useWalletContext();
	const [recipientAccount, setRecipientAcount] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [status, setStatus] = useState<string>("");

	const handleSend = async () => {
		if (!account || !signer) {
			setStatus("Please connect your wallet first.");
			return;
		}

		setStatus("Sending...");

		try {
			const txHash = await sendEth(signer, recipientAccount, amount);
			setStatus(`Transaction confirmed! Hash: ${txHash}`);
			setRecipientAcount("");
			setAmount("");
		} catch (err: any) {
			setStatus(err.message || "Transaction failed, check console.");
			console.error(err);
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
				onClick={handleSend}
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
