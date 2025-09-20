import { FormInputError } from "@/shared/ui/input/form-input-error";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/shared/form";
import { cn } from "@/lib/utils";
import { AppImage } from "@/shared/ui/app-image";
import { useId } from "react";
import { X } from "lucide-react";
import { FormInputDescription } from "@/shared/ui/input/form-input-description";

type ImageInputProps = {
	label: string;
	description: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ImageInput = ({ label, description, ...inputProps }: ImageInputProps) => {
	const { className: inputClassName, ...otherProps } = { ...inputProps };

	const id = useId();
	const field = useFieldContext<string[]>();

	const hasError = field.state.meta.errors.length > 0 && field.state.meta.isTouched;

	return (
		<div className="space-y-2">
			<div className="space-y-1 relative">
				<X
					className={`absolute top-7 right-2 text-muted-foreground cursor-pointer z-50 ${field.state.value.length === 0 ? "hidden" : ""}`}
					onClick={() => {
						field.handleChange([]);
					}}
				/>
				<Label htmlFor={id} className={hasError ? "text-destructive" : ""}>
					{label}
					<AppImage
						url={field.state.value?.[0] ?? "placeholder.png"}
						className={`w-full h-full object-contain border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${hasError ? "border-destructive" : ""}`}
					/>
					<input
						id={id}
						type="file"
						accept="image/*"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							const reader = new FileReader();
							reader.onloadend = () => {
								field.handleChange([reader.result as string]);
							};
							reader.readAsDataURL(file);
						}}
						{...otherProps}
						aria-invalid={hasError}
						className={cn("hidden", inputClassName)}
						multiple
					/>
				</Label>
			</div>
			{hasError ?
				<FormInputError meta={field.state.meta} />
			:	<FormInputDescription description={description} />}
		</div>
	);
};
