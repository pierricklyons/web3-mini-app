import { READ_ERC20_ABI } from "@/constants/abis";
import { Contract, Provider, Signer, formatUnits } from "ethers";

export const getTokenBalance = async (
	provider: Provider | Signer,
	userAddress: string,
	token: TokenInfo,
): Promise<TokenBalance> => {
	try {
		const contract = new Contract(token.address, READ_ERC20_ABI, provider);
		const rawBalance = await contract.balanceOf(userAddress);
		const formatted = formatUnits(rawBalance, token.decimals);

		return { symbol: token.symbol, balance: formatted };
	} catch (error) {
		console.error(error);

		return { symbol: token.symbol, balance: "0" };
	}
};
