export const ERRORS = {
	NO_ADDRESS: "No address to shorten",
	INVALID_ADDRESS: "Invalid Ethereum address",
};

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const shortenAddress = (address: string): string => {
	if (!address) throw new Error(ERRORS.NO_ADDRESS);

	if (!ADDRESS_REGEX.test(address)) throw new Error(ERRORS.INVALID_ADDRESS);

	return `${address.slice(0, 6)}…${address.slice(-4)}`;
};
