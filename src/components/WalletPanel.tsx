"use client";

import { useState } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { Tooltip } from "@/components/Tooltip";
import { shortenAddress } from "@/utils/shortenAddress";

export const WalletPanel = () => {
	const { account, balance, walletName, chain } = useWalletContext();

	const [copied, setCopied] = useState(false);

	const copyAddress = async () => {
		if (!account) return;
		await navigator.clipboard.writeText(account);
		setCopied(true);
	};

	return (
		<div className="flex flex-col gap-4 rounded bg-neutral-700 p-6 shadow">
			<p>
				<span className="font-semibold">Wallet:</span>{" "}
				{account ? (walletName ?? "-") : "-"}
			</p>
			<p>
				<span className="font-semibold">Account:</span>{" "}
				{account ? (
					<Tooltip
						text={copied ? "Copied!" : "Copy full address"}
						onClick={copyAddress}
						onMouseLeave={() => setCopied(false)}
					>
						{shortenAddress(account)}
					</Tooltip>
				) : (
					"-"
				)}
			</p>
			<p>
				<span className="font-semibold">Balance:</span>{" "}
				{account ? (balance ?? "-") : "-"}
			</p>
			<p>
				<span className="font-semibold">Network:</span>{" "}
				{account
					? `${chain?.name ?? "-"} (${chain?.chainId ?? "-"})`
					: "-"}
			</p>
		</div>
	);
};
