import { WalletProvider } from "@/context/WalletContext";
import "@/styles/global.css";

export const metadata = {
	title: "Web3 Mini App",
	description: "Next.js Web3 demo app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<WalletProvider>{children}</WalletProvider>
			</body>
		</html>
	);
};

export default RootLayout;
