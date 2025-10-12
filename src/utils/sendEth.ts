import { Address } from "@/types/Address";
import { Signer } from "ethers";

export const sendEth = async (
	signer: Signer,
	recipientAddress: Address,
	amount: bigint,
): Promise<string> => {
	const tx = await signer.sendTransaction({
		to: recipientAddress,
		value: amount,
	});

	await tx.wait();
	return tx.hash;
};
