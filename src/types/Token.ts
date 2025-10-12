import { Address } from "@/types/Address";

export type Token = {
	address: Address;
	symbol: string;
	decimals: number;
};

export type TokenBalance = {
	symbol: string;
	balance: string;
};
