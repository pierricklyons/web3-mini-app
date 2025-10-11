const WORD_REGEX = /^[A-Za-z]+$/;

export const ERRORS = {
	EMPTY: "Cannot capitalize an empty string!",
	INVALID: "Input must be a single word containing only letters!",
};

export const capitalizeWord = (word: string): string => {
	if (!word) throw new Error(ERRORS.EMPTY);
	if (!WORD_REGEX.test(word)) {
		throw new Error(ERRORS.INVALID);
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
};
