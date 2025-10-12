import { Address } from "@/types/Address";

export const shortenAddress = (address: Address): string => {
	return `${address.slice(0, 6)}…${address.slice(-4)}`;
};
