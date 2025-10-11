import { capitalizeWord, ERRORS } from "./capitalizeWord";

describe("capitalizeWord", () => {
	test("capitalizes a lowercase word", () => {
		expect(capitalizeWord("hello")).toBe("Hello");
	});

	test("keeps already capitalized word the same", () => {
		expect(capitalizeWord("Hello")).toBe("Hello");
	});

	test("keeps all uppercase word unchanged", () => {
		expect(capitalizeWord("HELLO")).toBe("HELLO");
	});

	test("capitalizes a single letter", () => {
		expect(capitalizeWord("a")).toBe("A");
	});

	test("throws error when word is empty", () => {
		expect(() => capitalizeWord("")).toThrow(ERRORS.EMPTY);
	});

	test.each(["hello123", "hello!", "hello world", "123", "!"])(
		"throws error when input is invalid: %s",
		(invalidInput) => {
			expect(() => capitalizeWord(invalidInput)).toThrow(ERRORS.INVALID);
		},
	);
});
