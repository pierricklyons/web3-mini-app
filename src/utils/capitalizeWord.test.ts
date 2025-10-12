import { capitalizeWord, ERRORS } from "./capitalizeWord";

describe("capitalizeWord", () => {
	it("throws an error if the input is empty", () => {
		expect(() => capitalizeWord("")).toThrow(ERRORS.NO_WORD);
	});

	it("throws an error if the input contains non-letters", () => {
		expect(() => capitalizeWord("123")).toThrow(ERRORS.INVALID_WORD);
		expect(() => capitalizeWord("hello123")).toThrow(ERRORS.INVALID_WORD);
		expect(() => capitalizeWord("hello world")).toThrow(
			ERRORS.INVALID_WORD,
		);
		expect(() => capitalizeWord("!@#")).toThrow(ERRORS.INVALID_WORD);
	});

	it("capitalizes a lowercase word", () => {
		expect(capitalizeWord("hello")).toBe("Hello");
	});

	it("leaves the first letter capitalized if already capitalized", () => {
		expect(capitalizeWord("World")).toBe("World");
	});
});
