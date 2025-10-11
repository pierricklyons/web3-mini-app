import { shortenAddress, ERRORS } from "./shortenAddress";

describe("shortenAddress", () => {
	test("shortens a normal Ethereum address", () => {
		const address = "0x1234567890abcdef1234567890abcdef12345678";
		const result = shortenAddress(address);
		expect(result).toBe("0x1234…5678");
	});

	test("throws an error when the address is empty", () => {
		expect(() => shortenAddress("")).toThrow(ERRORS.EMPTY);
	});

	test.each([
		"0x123", // too short
		"1234567890abcdef1234567890abcdef12345678", // missing 0x
		"0xG234567890abcdef1234567890abcdef12345678", // invalid hex
		"0x1234567890abcdef1234567890abcdef1234567Z", // invalid hex at end
		"0x1234567890abcdef1234567890abcdef123456789", // too long
	])("throws an error for invalid address: %s", (invalidAddr) => {
		expect(() => shortenAddress(invalidAddr)).toThrow(ERRORS.INVALID);
	});
});
