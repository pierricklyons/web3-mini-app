import { sendEth, ERRORS } from "./sendEth";
import { parseEther } from "ethers";

const mockValidSigner = {
	sendTransaction: jest.fn().mockResolvedValue({
		hash: "0x123",
		wait: jest.fn().mockResolvedValue(true),
	}),
} as any;
const validRecipientAddress = "0x1111111111111111111111111111111111111111";
const validAmount = "1.0";

describe("sendEth", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("throws if signer is missing", async () => {
		await expect(
			sendEth(null as any, validRecipientAddress, validAmount),
		).rejects.toThrow(ERRORS.NO_SIGNER);
	});

	it("throws if recipient address is invalid", async () => {
		const invalidRecipientAddress = "invalid-recipient-address";
		await expect(
			sendEth(mockValidSigner, invalidRecipientAddress, validAmount),
		).rejects.toThrow(ERRORS.INVALID_RECIPIENT_ADDRESS);
	});

	it("throws if amount is invalid", async () => {
		const invalidAmount = "-1.0";
		await expect(
			sendEth(mockValidSigner, validRecipientAddress, invalidAmount),
		).rejects.toThrow(ERRORS.INVALID_AMOUNT);
	});

	it("throws if amount is invalid", async () => {
		const invalidAmount = "-1.0";
		await expect(
			sendEth(mockValidSigner, validRecipientAddress, invalidAmount),
		).rejects.toThrow(ERRORS.INVALID_AMOUNT);
	});

	it("throws if signer.sendTransaction fails", async () => {
		// Temporarily override sendTransaction to fail
		mockValidSigner.sendTransaction.mockRejectedValueOnce(
			new Error("RPC Error"),
		);

		await expect(
			sendEth(mockValidSigner, validRecipientAddress, validAmount),
		).rejects.toThrow("RPC Error");
	});

	it("returns transaction hash when inputs are valid", async () => {
		const result = await sendEth(
			mockValidSigner,
			validRecipientAddress,
			validAmount,
		);

		expect(result).toBe("0x123");
		expect(mockValidSigner.sendTransaction).toHaveBeenCalledWith({
			to: validRecipientAddress,
			value: parseEther(validAmount),
		});
	});
});
