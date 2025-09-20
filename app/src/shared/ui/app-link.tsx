import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type AppLinkProps = {
	href: string;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function AppLink({ href, children, ...inputProps }: AppLinkProps) {
	const { className, ...otherProps } = { ...inputProps };

	return (
		<Link to={href} className={cn("hover:border-b hover:border-primary", className)} {...otherProps}>
			{children}
		</Link>
	);
}
