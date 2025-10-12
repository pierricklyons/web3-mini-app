const WORD_REGEX = /^[A-Za-z]+$/;

export const ERRORS = {
	NO_WORD: "Cannot capitalize an empty string!",
	INVALID_WORD: "Input must be a single word containing only letters!",
};

export const capitalizeWord = (word: string): string => {
	if (!word) throw new Error(ERRORS.NO_WORD);
	if (!WORD_REGEX.test(word)) throw new Error(ERRORS.INVALID_WORD);

	return word.charAt(0).toUpperCase() + word.slice(1);
};
