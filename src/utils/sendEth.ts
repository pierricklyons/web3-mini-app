import { ethers, Signer } from "ethers";

export const sendEth = async (
	signer: Signer,
	recipientAddress: string,
	amount: string,
) => {
	if (!signer) throw new Error("No signer provided!");
	if (!ethers.isAddress(recipientAddress))
		throw new Error("Invalid recipient address!");
	if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
		throw new Error("Invalid amount!");

	const tx = await signer.sendTransaction({
		to: recipientAddress,
		value: ethers.parseEther(amount),
	});

	await tx.wait();
	return tx.hash;
};
