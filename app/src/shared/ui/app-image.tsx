import { cn } from "@/lib/utils";

type AppImageProps = {
	url: string;
	title?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function AppImage({ url, title, ...inputProps }: AppImageProps) {
	const { className: inputClassName, ...otherProps } = { ...inputProps };
	return <img src={url} alt={title} className={cn("aspect-square w-full object-cover", inputClassName)} {...otherProps} />;
}
