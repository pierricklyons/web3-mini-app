import { capitalizeWord, ERRORS } from "./capitalizeWord";

describe("capitalizeWord", () => {
	it("capitalizes a lowercase word", () => {
		expect(capitalizeWord("hello")).toBe("Hello");
	});

	it("leaves the first letter capitalized if already capitalized", () => {
		expect(capitalizeWord("World")).toBe("World");
	});

	it("throws an error if the input is empty", () => {
		expect(() => capitalizeWord("")).toThrow(ERRORS.EMPTY);
	});

	it("throws an error if the input contains non-letters", () => {
		expect(() => capitalizeWord("123")).toThrow(ERRORS.INVALID);
		expect(() => capitalizeWord("hello123")).toThrow(ERRORS.INVALID);
		expect(() => capitalizeWord("hello world")).toThrow(ERRORS.INVALID);
		expect(() => capitalizeWord("!@#")).toThrow(ERRORS.INVALID);
	});
});
