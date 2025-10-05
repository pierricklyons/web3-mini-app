import { WalletControls } from "@/components/WalletControls";
import { WalletPanel } from "@/components/WalletPanel";

const Page = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-neutral-900 text-white">
			<div className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-neutral-800 p-6 shadow-lg">
				<header className="text-center text-3xl font-bold">Web3 Mini App</header>
				<WalletControls />
				<WalletPanel />
			</div>
		</div>
	);
};

export default Page;
