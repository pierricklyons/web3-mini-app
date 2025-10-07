import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	color?: "default" | "red" | "green";
	onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		disabled = false,
		color = "default",
		onClick,
	} = props;

	const colorClasses: Record<string, string> = {
		default: "bg-neutral-600 text-white hover:bg-neutral-500",
		red: "bg-red-500 text-white hover:bg-red-400 ",
		green: "bg-green-500 text-white hover:bg-green-400 ",
	};

	return (
		<button
			className={clsx(
				"w-fit rounded px-3 py-1 text-lg",
				colorClasses[color],
				"hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
