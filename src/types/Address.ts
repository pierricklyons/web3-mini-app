import { isAddress } from "ethers";

// Represents an address (string that has been validated with isAddress)
export type Address = string & {
	__brand: "Address";
};

type AddressErrorType = "NO_ADDRESS" | "INVALID_ADDRESS";

// Represents an error that occured when parsing an address
export interface AddressError {
	message: string;
	type: AddressErrorType;
}

// Constructs an AddressError
export const addressError = (
	type: AddressErrorType,
	message: string,
): AddressError => ({
	type,
	message,
});

// Takes a string and returns a valid Address
// Throws if parsing fails (address is invalid)
export const parseAddress = (address: string): Address => {
	if (!address) throw addressError("NO_ADDRESS", "No address given!");
	if (!isAddress(address))
		throw addressError("INVALID_ADDRESS", "Invalid address given!");

	return address as Address;
};
