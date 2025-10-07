import type { ReactNode } from "react";
import clsx from "clsx";

interface TooltipProps {
	children: ReactNode;
	text: string;
	className?: string;
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

export const Tooltip = (props: TooltipProps) => {
	const { children, text, className, onClick, onMouseEnter, onMouseLeave } =
		props;

	return (
		<span
			className={clsx(
				"group relative inline-block cursor-pointer underline",
				className,
			)}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
			<span
				className={clsx(
					"absolute bottom-full left-1/2 -translate-x-1/2 rounded bg-neutral-600 px-2 py-1 text-xs whitespace-nowrap opacity-0",
					"group-hover:opacity-100",
				)}
			>
				{text}
			</span>
		</span>
	);
};
