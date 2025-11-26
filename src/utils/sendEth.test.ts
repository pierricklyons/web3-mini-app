import { parseAddress } from "@/types/Address";
import { sendEth } from "./sendEth";
import { parseEther } from "ethers";
import { Signer } from "ethers";

const sendTransaction = jest.fn().mockResolvedValue({
	hash: "0x123",
	wait: jest.fn().mockResolvedValue(true),
});

const mockSigner = {
	sendTransaction,
} as unknown as Signer;
const mockRecipientAddress = parseAddress(
	"0x1111111111111111111111111111111111111111",
);
const mockAmount = parseEther("1.0");

describe("sendEth", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Throws if signer.sendTransaction fails", async () => {
		// Temporarily override sendTransaction to fail
		sendTransaction.mockRejectedValueOnce(new Error("RPC Error"));

		await expect(
			sendEth(mockSigner, mockRecipientAddress, mockAmount),
		).rejects.toThrow("RPC Error");
	});

	it("Returns transaction hash when inputs are valid", async () => {
		const result = await sendEth(
			mockSigner,
			mockRecipientAddress,
			mockAmount,
		);

		expect(result).toBe("0x123");
		expect(mockSigner.sendTransaction).toHaveBeenCalledWith({
			to: mockRecipientAddress,
			value: mockAmount,
		});
	});
});
