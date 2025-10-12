"use client";

import { useState } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { Button } from "./Button";
import { sendEth } from "@/utils/sendEth";
import { parseAddress } from "@/types/Address";
import { parseEther } from "ethers";

export const TransactionPanel = () => {
	const { account, signer } = useWalletContext();
	const [recipientAccount, setRecipientAcount] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [status, setStatus] = useState<string>("");

	const handleSend = async () => {
		if (!account || !signer) {
			setStatus("Please connect a wallet.");
			return;
		}

		setStatus("Sending...");

		try {
			const hash = await sendEth(
				signer,
				parseAddress(recipientAccount),
				parseEther(amount),
			);
			setStatus(`Transaction confirmed! Hash: ${hash}`);
			setRecipientAcount("");
			setAmount("");
		} catch (error) {
			if (error instanceof Error) {
				setStatus(error.message);
			} else {
				setStatus("Transaction failed.");
			}
			console.error(error);
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
