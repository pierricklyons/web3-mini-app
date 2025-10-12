import { READ_ERC20_ABI } from "@/constants";
import { Contract, Provider, Signer, formatUnits, isAddress } from "ethers";

export const ERRORS = {
	NO_PROVIDER: "No provider available",
	INVALID_USER_ADDRESS: (userAddress: string) =>
		`Invalid user address: ${userAddress}`,
	INVALID_TOKEN_ADDRESS: (tokenAddress: string) =>
		`Invalid token address: ${tokenAddress}`,
	RPC_CALL_FAIL: (tokenSymbol: string) =>
		`Failed to fetch ${tokenSymbol} balance`,
};

export const getTokenBalance = async (
	provider: Provider | Signer,
	userAddress: string,
	token: TokenInfo,
): Promise<TokenBalance> => {
	if (!provider) throw new Error(ERRORS.NO_PROVIDER);
	if (!isAddress(userAddress))
		throw new Error(ERRORS.INVALID_USER_ADDRESS(userAddress));
	if (!isAddress(token.address))
		throw new Error(ERRORS.INVALID_TOKEN_ADDRESS(token.address));

	try {
		const contract = new Contract(token.address, READ_ERC20_ABI, provider);
		const rawBalance = await contract.balanceOf(userAddress);
		const formatted = formatUnits(rawBalance, token.decimals);

		return { symbol: token.symbol, balance: formatted };
	} catch (error) {
		throw new Error(ERRORS.RPC_CALL_FAIL(token.symbol));
	}
};
