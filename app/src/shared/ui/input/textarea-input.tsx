import { FormInputError } from "@/shared/ui/input/form-input-error";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/shared/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { FormInputDescription } from "@/shared/ui/input/form-input-description";

type TextFieldProps = {
	label: string;
	description: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaInput = ({ label, description, ...inputProps }: TextFieldProps) => {
	const { className: inputClassName, ...otherProps } = { ...inputProps };

	const id = useId();
	const field = useFieldContext<string>();

	const hasError = field.state.meta.errors.length > 0 && field.state.meta.isTouched;

	return (
		<div className="space-y-2">
			<div className="space-y-1">
				<Label htmlFor={id} className={hasError ? "text-destructive" : ""}>
					{label}
				</Label>
				<Textarea
					id={id}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					{...otherProps}
					aria-invalid={hasError}
					className={cn("field-sizing-fixed max-h-24 [resize:none]", inputClassName)}
				/>
			</div>
			{hasError ?
				<FormInputError meta={field.state.meta} />
			:	<FormInputDescription description={description} />}
		</div>
	);
};
