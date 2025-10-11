import { shortenAddress, ERRORS } from "./shortenAddress";

describe("shortenAddress", () => {
	const validAddress = "0x1234567890abcdef1234567890abcdef12345678";

	it("shortens a valid Ethereum address", () => {
		expect(shortenAddress(validAddress)).toBe("0x1234…5678");
	});

	it("throws an error if the address is empty", () => {
		expect(() => shortenAddress("")).toThrow(ERRORS.EMPTY);
	});

	it("throws an error if the address is invalid", () => {
		expect(() => shortenAddress("0x123")).toThrow(ERRORS.INVALID);
		expect(() => shortenAddress("not-an-address")).toThrow(ERRORS.INVALID);
	});
});
