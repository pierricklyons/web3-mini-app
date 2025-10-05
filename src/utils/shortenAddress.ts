export const shortenAddress = (address: string | null) => {
	if (!address) {
		console.error("No address to shorten");
		return "";
	}
	return `${address.slice(0, 6)}…${address.slice(-4)}`;
};
