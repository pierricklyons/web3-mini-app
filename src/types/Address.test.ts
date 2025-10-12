import { parseAddress } from "./Address";

const VALID_ADDDRESS_VALUE = "0x1234567890abcdef1234567890abcdef12345678";

describe("parseAddress", () => {
	it("throws an error if the address is empty", () => {
		expect(() => parseAddress("")).toThrow();
	});

	it("throws an error if the address is invalid", () => {
		expect(() => parseAddress("0x123")).toThrow();
		expect(() => parseAddress("invalid-address")).toThrow();
	});

	it("Parses a string containing a valid address", () => {
		expect(parseAddress(VALID_ADDDRESS_VALUE)).toEqual(
			VALID_ADDDRESS_VALUE,
		);
	});
});
