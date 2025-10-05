"use client";

import React, { createContext, useContext } from "react";
import { useWallet } from "@/hooks/useWallet";

type WalletContextValue = ReturnType<typeof useWallet>;

const WalletContext = createContext<WalletContextValue | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
	const wallet = useWallet();
	return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => {
	const context = useContext(WalletContext);
	if (!context) throw new Error("useWalletContext must be used inside <WalletProvider>");
	return context;
};
