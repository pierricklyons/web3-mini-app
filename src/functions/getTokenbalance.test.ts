import { getTokenBalance, ERRORS } from "./getTokenBalance";
import { Contract } from "ethers";

jest.mock("ethers", () => {
	const original = jest.requireActual("ethers");
	return {
		...original,
		Contract: jest.fn().mockImplementation(() => ({
			balanceOf: jest.fn(),
		})),
		isAddress: jest.fn((addr) => /^0x[a-fA-F0-9]{40}$/.test(addr)),
		formatUnits: jest.fn((value) => (Number(value) / 1e18).toString()),
	};
});

const mockProvider = {} as any;
const validUser = "0x1111111111111111111111111111111111111111";
const validToken = {
	address: "0x2222222222222222222222222222222222222222",
	symbol: "DAI",
	decimals: 18,
};

describe("getTokenBalance", () => {
	it("returns the formatted balance", async () => {
		(Contract as jest.Mock).mockImplementation(() => ({
			balanceOf: jest
				.fn()
				.mockResolvedValue(BigInt("1000000000000000000")),
		}));

		const result = await getTokenBalance(
			mockProvider,
			validUser,
			validToken,
		);
		expect(result).toEqual({ symbol: "DAI", balance: "1" });
	});

	it("throws if provider is missing", async () => {
		await expect(
			getTokenBalance(null as any, validUser, validToken),
		).rejects.toThrow(ERRORS.NO_PROVIDER);
	});

	it("throws if balanceOf fails", async () => {
		(Contract as jest.Mock).mockImplementation(() => ({
			balanceOf: jest.fn().mockRejectedValue(new Error("RPC Error")),
		}));

		await expect(
			getTokenBalance(mockProvider, validUser, validToken),
		).rejects.toThrow(ERRORS.BALANCE_FETCH_FAILED(validToken.symbol));
	});
});
