"use client";

import { useState } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { Tooltip } from "@/components/Tooltip";
import { shortenAddress } from "@/utils/shortenAddress";

export const WalletPanel = () => {
	const { address, balance, walletName, network } = useWalletContext();

	const [copied, setCopied] = useState(false);

	const copyAddress = async () => {
		if (!address) return;
		await navigator.clipboard.writeText(address);
		setCopied(true);
	};

	return (
		<div className="flex flex-col gap-4 rounded bg-neutral-700 p-4 shadow">
			<p>
				<span className="font-semibold">Wallet:</span> {address ? (walletName ?? "-") : "-"}
			</p>
			<p>
				<span className="font-semibold">Account:</span>{" "}
				{address ? (
					<Tooltip
						text={copied ? "Copied!" : "Copy full address"}
						onClick={copyAddress}
						onMouseLeave={() => setCopied(false)}
					>
						{shortenAddress(address)}
					</Tooltip>
				) : (
					"-"
				)}
			</p>
			<p>
				<span className="font-semibold">Balance:</span> {address ? (balance ?? "-") : "-"}
			</p>
			<p>
				<span className="font-semibold">Network:</span>{" "}
				{address ? `${network?.name ?? "-"} (${network?.chainId ?? "-"})` : "-"}
			</p>
		</div>
	);
};
