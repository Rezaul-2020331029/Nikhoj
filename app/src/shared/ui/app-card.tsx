import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AppCardProps = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function AppCard({ children, ...inputProps }: AppCardProps) {
	const { className: inputClassName, ...otherProps } = { ...inputProps };
	return (
		<Card className={cn("bg-white/50 backdrop-blur-sm border-slate-200 shadow-sm", inputClassName)} {...otherProps}>
			<CardContent className="p-6">{children}</CardContent>
		</Card>
	);
}
