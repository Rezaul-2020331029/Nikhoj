import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormInputError } from "@/shared/ui/input/form-input-error";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/shared/form";
import { useId } from "react";
import { FormInputDescription } from "@/shared/ui/input/form-input-description";

type BaseSelectFieldProps = {
	name: string;
	label: string;
	description: string;
	placeholder?: string;
};

type SelectFieldProps<T> =
	| ((BaseSelectFieldProps & { options: string[]; optionsWithKey?: never }) &
			React.HtmlHTMLAttributes<HTMLInputElement>)
	| ((BaseSelectFieldProps & { optionsWithKey: { key: T; value: React.ReactNode }[]; options?: never }) &
			React.HtmlHTMLAttributes<HTMLInputElement>);

export function SelectInput<T>({
	name,
	label,
	description,
	options,
	optionsWithKey,
	placeholder,
}: SelectFieldProps<T>) {
	const id = useId();
	const field = useFieldContext<string>();

	const hasError = Boolean(!field.state.meta.isPristine && field.state.meta.errors.length > 0);

	return (
		<div className="space-y-2">
			<div className="space-y-1">
				<Label htmlFor={id} className={hasError ? "text-destructive" : ""}>
					{label}
				</Label>
				<Select
					value={field.state.value}
					name={name}
					onValueChange={(val) => field.handleChange(val)}
					onOpenChange={(open) => {
						if (!open) field.handleBlur();
					}}
				>
					<SelectTrigger id={id}>
						<SelectValue placeholder={placeholder ?? `Select ${label.toLowerCase()}`} aria-invalid={hasError} />
					</SelectTrigger>
					<SelectContent>
						{options?.map((value) => (
							<SelectItem key={value} value={value}>
								{value}
							</SelectItem>
						))}

						{optionsWithKey?.map(({ key, value }) => (
							<SelectItem key={String(key)} value={String(key)}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{hasError ?
				<FormInputError meta={field.state.meta} />
			:	<FormInputDescription description={description} />}
		</div>
	);
}
