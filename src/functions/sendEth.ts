import { Signer, isAddress, parseEther } from "ethers";

export const ERRORS = {
	NO_SIGNER: "No signer provided!",
	INVALID_RECIPIENT_ADDRESS: "Invalid recipient address!",
	INVALID_AMOUNT: "Invalid amount!",
};

export const sendEth = async (
	signer: Signer,
	recipientAddress: string,
	amount: string,
): Promise<string> => {
	if (!signer) throw new Error(ERRORS.NO_SIGNER);
	if (!isAddress(recipientAddress))
		throw new Error(ERRORS.INVALID_RECIPIENT_ADDRESS);
	if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
		throw new Error(ERRORS.INVALID_AMOUNT);

	const tx = await signer.sendTransaction({
		to: recipientAddress,
		value: parseEther(amount),
	});

	await tx.wait();
	return tx.hash;
};
