"use client";

import { Button } from "@/components/Button";
import { useWalletContext } from "@/context/WalletContext";

interface WalletControlsProps {}

export const WalletControls = (props: WalletControlsProps) => {
	const {} = props;

	const { account, connectWallet, resetWallet } = useWalletContext();

	return (
		<div className="flex flex-row justify-center gap-3">
			<Button onClick={connectWallet} disabled={!!account} color="green">
				{account ? "Connected" : "Connect"}
			</Button>
			{/* <Button onClick={connectWallet} disabled={!account} color="default">
				{"Refresh"}
			</Button> */}
			<Button onClick={resetWallet} disabled={!account} color="red">
				Reset
			</Button>
		</div>
	);
};
