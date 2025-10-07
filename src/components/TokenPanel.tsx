import { useWalletContext } from "@/context/WalletContext";

export const TokenPanel = () => {
	const { tokenBalances } = useWalletContext();

	return (
		<>
			{tokenBalances.map((token) => (
				<p key={token.symbol}>
					<span className="font-semibold">{token.symbol}:</span>{" "}
					{token.balance}
				</p>
			))}
		</>
	);
};
