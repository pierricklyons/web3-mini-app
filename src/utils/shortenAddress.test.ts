import { parseAddress } from "@/types/Address";
import { shortenAddress } from "./shortenAddress";

const validAddress = parseAddress("0x1234567890abcdef1234567890abcdef12345678");

describe("shortenAddress", () => {
	it("Correctly shortens an address", () => {
		expect(shortenAddress(validAddress)).toBe("0x1234…5678");
	});
});
