import { shortenAddress, ERRORS } from "./shortenAddress";

const VALID_ADDDRESS = "0x1234567890abcdef1234567890abcdef12345678";

describe("shortenAddress", () => {
	it("throws an error if the address is empty", () => {
		expect(() => shortenAddress("")).toThrow(ERRORS.NO_ADDRESS);
	});

	it("throws an error if the address is invalid", () => {
		expect(() => shortenAddress("0x123")).toThrow(ERRORS.INVALID_ADDRESS);
		expect(() => shortenAddress("invalid-address")).toThrow(
			ERRORS.INVALID_ADDRESS,
		);
	});

	it("shortens a valid Ethereum address", () => {
		expect(shortenAddress(VALID_ADDDRESS)).toBe("0x1234…5678");
	});
});
