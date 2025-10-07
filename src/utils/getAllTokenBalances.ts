import { ethers, Provider, Signer } from "ethers";

const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

export const getTokenBalance = async (
	provider: Provider | Signer,
	token: TokenInfo,
	userAddress: string,
) => {
	try {
		const contract = new ethers.Contract(
			token.address,
			ERC20_ABI,
			provider,
		);
		const rawBalance = await contract.balanceOf(userAddress);
		const formatted = ethers.formatUnits(rawBalance, token.decimals);
		return { symbol: token.symbol, balance: formatted };
	} catch (err) {
		console.error(`Failed to fetch ${token.symbol} balance:`, err);
		return { symbol: token.symbol, balance: "0" };
	}
};

export const getAllTokenBalances = async (
	provider: Provider | Signer,
	userAddress: string,
	tokens: TokenInfo[],
) => {
	const balances = await Promise.all(
		tokens.map((token) => getTokenBalance(provider, token, userAddress)),
	);
	return balances;
};
