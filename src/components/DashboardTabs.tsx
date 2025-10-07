"use client";

import { ReactNode, useState } from "react";
import { WalletPanel } from "@/components/WalletPanel";
import { TransactionPanel } from "@/components/TransactionPanel";
import { TokenPanel } from "@/components/TokenPanel";
import { capitalize } from "@/utils/capitalize";
import clsx from "clsx";

const TABS = ["wallet", "transaction", "tokens"];

export const DashboardTabs = () => {
	const [activeTab, setActiveTab] = useState<string>("wallet");

	interface TabProps {
		children?: ReactNode;
		active?: boolean;
		onClick?: () => void;
	}

	const Tab = (props: TabProps) => {
		const { children, active, onClick } = props;

		return (
			<button
				className={clsx(
					"w-full rounded-t-lg bg-neutral-700 py-2 font-semibold text-white",
					"hover: cursor-pointer",
					active
						? "bg-neutral-700"
						: "bg-neutral-800 !text-neutral-500",
				)}
				onClick={onClick}
			>
				{children}
			</button>
		);
	};

	return (
		<div className="flex w-full flex-col">
			<div className="flex flex-row">
				{TABS.map((tab) => (
					<Tab
						active={activeTab === tab}
						onClick={() => setActiveTab(tab)}
						key={tab}
					>
						{capitalize(tab)}
					</Tab>
				))}
			</div>
			<div
				className={clsx(
					"flex flex-col gap-4 rounded-b-lg bg-neutral-700 p-6 shadow",
					activeTab === "wallet" && "rounded-tr-lg",
					activeTab === "transaction" && "rounded-t-lg",
					activeTab === "tokens" && "rounded-tl-lg",
				)}
			>
				{activeTab === "wallet" && <WalletPanel />}
				{activeTab === "transaction" && <TransactionPanel />}
				{activeTab === "tokens" && <TokenPanel />}
			</div>
		</div>
	);
};
