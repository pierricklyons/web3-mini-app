"use client";

import { Button } from "@/components/Button";
import { useWalletContext } from "@/context/WalletContext";

interface WalletControlsProps {}

export const WalletControls = (props: WalletControlsProps) => {
	const {} = props;

	const { address, connectWallet, resetWallet } = useWalletContext();

	return (
		<div className="flex flex-row justify-center gap-3">
			<Button onClick={connectWallet} disabled={!!address} color="green">
				{address ? "Connected" : "Connect"}
			</Button>
			<Button onClick={resetWallet} disabled={!address} color="red">
				Reset
			</Button>
		</div>
	);
};
