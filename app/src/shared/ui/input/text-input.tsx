import { Input } from "@/components/ui/input";
import { FormInputError } from "@/shared/ui/input/form-input-error";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/shared/form";
import { useId } from "react";
import { FormInputDescription } from "@/shared/ui/input/form-input-description";

// Map input type to value type
type InputValueType<T extends React.HTMLInputTypeAttribute> = T extends "number" ? number | undefined : string;

type TextInputProps<T extends React.HTMLInputTypeAttribute = "text"> = {
	label: string;
	description: string;
	type?: T;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange">;

export function TextInput<T extends React.HTMLInputTypeAttribute = "text">({
	label,
	description,
	type = "text" as T,
	...inputProps
}: TextInputProps<T>) {
	const id = useId();
	const field = useFieldContext<InputValueType<T>>();

	const hasError = field.state.meta.errors.length > 0 && field.state.meta.isTouched;

	return (
		<div className="space-y-2">
			<div className="space-y-1">
				<Label htmlFor={id} className={hasError ? "text-destructive" : ""}>
					{label}
				</Label>
				<Input
					id={id}
					name=""
					value={field.state.value}
					onChange={(e) => {
						field.handleChange(e.target.value as InputValueType<T>);
					}}
					onBlur={field.handleBlur}
					type={type}
					{...inputProps}
					aria-invalid={hasError}
				/>
			</div>
			{hasError ?
				<FormInputError meta={field.state.meta} />
			:	<FormInputDescription description={description} />}
		</div>
	);
}
