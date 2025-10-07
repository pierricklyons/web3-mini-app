import { DashboardTabs } from "@/components/DashboardTabs";
import { TokenPanel } from "@/components/Tokenpanel";
import { TransactionPanel } from "@/components/TransactionPanel";
import { WalletControls } from "@/components/WalletControls";
import { WalletPanel } from "@/components/WalletPanel";

const Page = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-neutral-900 text-white">
			<div className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-neutral-800 p-6 shadow-lg">
				<header className="text-center text-3xl font-bold">
					Web3 Mini App
				</header>
				{/* <WalletControls />
				<WalletPanel />
				<TransactionPanel />
				<TokenPanel /> */}
				<WalletControls />
				<DashboardTabs />
			</div>
		</div>
	);
};

export default Page;
