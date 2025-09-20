type AppLogoProps = {
	className?: string;
};

export function AppLogo({ className }: AppLogoProps) {
	return (
		<img
			src="/logo.svg"
			alt="Nikhoj"
			className={className ?? "w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]"}
		/>
	);
}
