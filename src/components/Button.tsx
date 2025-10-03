import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
	const { className, children, onClick } = props;

	return (
		<button
			className={clsx(
				className,
				"w-fit rounded bg-gray-800 px-3 py-1 text-lg text-white hover:cursor-pointer",
				"hover:cursor-pointer hover:bg-gray-600"
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
