import { READ_ERC20_ABI } from "@/constants";
import { Contract, Provider, Signer, formatUnits, isAddress } from "ethers";

export const ERRORS = {
	NO_PROVIDER: "Provider is required",
	INVALID_USER_ADDRESS: "Invalid Ethereum address",
	INVALID_TOKEN_ADDRESS: "Invalid token address",
	MISSING_SYMBOL: "Token symbol is required",
	INVALID_DECIMALS: "Token decimals must be a number",
	BALANCE_FETCH_FAILED: (symbol: string) =>
		`Failed to fetch balance for ${symbol}`,
};

export const getTokenBalance = async (
	provider: Provider | Signer,
	userAddress: string,
	token: TokenInfo,
): Promise<TokenBalance> => {
	if (!provider) throw new Error(ERRORS.NO_PROVIDER);
	if (!userAddress || !isAddress(userAddress))
		throw new Error(ERRORS.INVALID_USER_ADDRESS);
	if (!token?.address || !isAddress(token.address))
		throw new Error(ERRORS.INVALID_TOKEN_ADDRESS);
	if (!token.symbol) throw new Error(ERRORS.MISSING_SYMBOL);
	if (typeof token.decimals !== "number")
		throw new Error(ERRORS.INVALID_DECIMALS);

	try {
		const contract = new Contract(token.address, READ_ERC20_ABI, provider);
		const rawBalance = await contract.balanceOf(userAddress);
		const formatted = formatUnits(rawBalance, token.decimals);

		return { symbol: token.symbol, balance: formatted };
	} catch (error: any) {
		throw new Error(ERRORS.BALANCE_FETCH_FAILED(token.symbol));
	}
};
