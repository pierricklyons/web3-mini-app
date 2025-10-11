export const ERRORS = {
	EMPTY: "No address to shorten",
	INVALID: "Invalid Ethereum address",
};

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const shortenAddress = (address: string): string => {
	if (!address) throw new Error("No address to shorten ");

	if (!ADDRESS_REGEX.test(address))
		throw new Error("Invalid Ethereum address");

	return `${address.slice(0, 6)}…${address.slice(-4)}`;
};
