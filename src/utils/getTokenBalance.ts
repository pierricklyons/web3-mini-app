import { READ_ERC20_ABI } from "@/constants";
import { Address } from "@/types/Address";
import { Token, TokenBalance } from "@/types/Token";
import { Contract, Provider, Signer, formatUnits } from "ethers";

export const getTokenBalance = async (
	provider: Provider | Signer,
	userAddress: Address,
	token: Token,
): Promise<TokenBalance> => {
	try {
		const contract = new Contract(token.address, READ_ERC20_ABI, provider);
		const rawBalance = await contract.balanceOf(userAddress);
		const formatted = formatUnits(rawBalance, token.decimals);

		return { symbol: token.symbol, balance: formatted };
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(message);
	}
};
