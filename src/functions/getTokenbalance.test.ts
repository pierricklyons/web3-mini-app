import { getTokenBalance, ERRORS } from "./getTokenBalance";
import { Contract } from "ethers";

jest.mock("ethers", () => {
	const original = jest.requireActual("ethers");
	return {
		...original,
		Contract: jest.fn(),
	};
});

const mockValidProvider = {} as any;
const validUserAddress = "0x1111111111111111111111111111111111111111";
const validToken = {
	address: "0x2222222222222222222222222222222222222222",
	symbol: "DAI",
	decimals: 18,
};

const mockContract = Contract as unknown as jest.Mock;

describe("getTokenBalance", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("throws if provider is missing", async () => {
		await expect(
			getTokenBalance(null as any, validUserAddress, validToken),
		).rejects.toThrow(ERRORS.NO_PROVIDER);
	});

	it("throws if user address is invalid", async () => {
		const invalidUserAddress = "invalid-user-address";
		await expect(
			getTokenBalance(mockValidProvider, invalidUserAddress, validToken),
		).rejects.toThrow(ERRORS.INVALID_USER_ADDRESS(invalidUserAddress));
	});

	it("throws if token address is invalid", async () => {
		const invalidToken = {
			...validToken,
			address: "invalid",
		};
		await expect(
			getTokenBalance(mockValidProvider, validUserAddress, invalidToken),
		).rejects.toThrow(ERRORS.INVALID_TOKEN_ADDRESS(invalidToken.address));
	});

	it("returns formatted token balance", async () => {
		// mock a successful contract call
		mockContract.mockImplementation(() => ({
			balanceOf: jest
				.fn()
				.mockResolvedValue(BigInt("1000000000000000000")),
		}));

		const result = await getTokenBalance(
			mockValidProvider,
			validUserAddress,
			validToken,
		);

		expect(result).toEqual({ symbol: "DAI", balance: "1.0" });
	});

	it("throws if RPC call fails", async () => {
		mockContract.mockImplementation(() => ({
			balanceOf: jest.fn().mockRejectedValue(new Error("RPC error")),
		}));

		await expect(
			getTokenBalance(mockValidProvider, validUserAddress, validToken),
		).rejects.toThrow(ERRORS.RPC_CALL_FAIL(validToken.symbol));
	});
});
