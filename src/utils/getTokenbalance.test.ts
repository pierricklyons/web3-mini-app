import { Address, parseAddress } from "@/types/Address";
import { getTokenBalance } from "./getTokenBalance";
import { Contract } from "ethers";
import { Token } from "@/types/Token";

jest.mock("ethers", () => {
	const original = jest.requireActual("ethers");
	return {
		...original,
		Contract: jest.fn(),
	};
});

const mockProvider = {} as any;
const mockUserAddress = parseAddress(
	"0x1111111111111111111111111111111111111111",
);
const mockToken: Token = {
	address: parseAddress("0x2222222222222222222222222222222222222222"),
	symbol: "DAI",
	decimals: 18,
};

const mockContract = Contract as unknown as jest.Mock;

describe("getTokenBalance", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Returns formatted token balance", async () => {
		// mock a successful contract call
		mockContract.mockImplementation(() => ({
			balanceOf: jest
				.fn()
				.mockResolvedValue(BigInt("1000000000000000000")),
		}));

		const result = await getTokenBalance(
			mockProvider,
			mockUserAddress,
			mockToken,
		);

		expect(result).toEqual({ symbol: "DAI", balance: "1.0" });
	});

	it("Throws on error", async () => {
		mockContract.mockImplementation(() => ({
			balanceOf: jest.fn().mockRejectedValue(new Error("RPC error")),
		}));

		await expect(
			getTokenBalance(mockProvider, mockUserAddress, mockToken),
		).rejects.toThrow(Error);
	});
});
