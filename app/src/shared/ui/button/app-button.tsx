import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AppButtonProps = {
	children: React.ReactNode;
	variant?: "default" | "destructive" | "ghost" | "outline" | "secondary" | "link";
	size?: "default" | "sm" | "lg" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function AppButton({ children, variant = "default", size = "default", ...buttonProps }: AppButtonProps) {
	const { className: inputClassName, ...otherProps } = { ...buttonProps };
	return (
		<Button className={cn("cursor-pointer", inputClassName)} variant={variant} size={size} {...otherProps}>
			{children}
		</Button>
	);
}

type AppLinkButtonProps = {
	href: string;
	children: React.ReactNode;
} & AppButtonProps;

export function AppLinkButton({ href, children, ...buttonProps }: AppLinkButtonProps) {
	const { onClick, ...otherProps } = { ...buttonProps };
	const navigate = useNavigate();
	return (
		<AppButton
			onClick={(e) => {
				onClick?.(e);
				navigate({ to: href });
			}}
			{...otherProps}
		>
			{children}
		</AppButton>
	);
}
