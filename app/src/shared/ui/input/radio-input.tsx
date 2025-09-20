import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "@/shared/form";
import { FormInputDescription } from "@/shared/ui/input/form-input-description";
import { FormInputError } from "@/shared/ui/input/form-input-error";
import { toStringOrThrow } from "@/shared/utils/to-string";

export type RadioInputProps = {
	name: string;
	label: string;
	description: string;
	radioButtons: string[];
};

export function RadioInput({ name, label, description, radioButtons }: RadioInputProps) {
	const field = useFieldContext<string>();

	const hasError = Boolean(!field.state.meta.isPristine && field.state.meta.errors.length > 0);

	return (
		<div className="space-y-2">
			<div className="space-y-1">
				<p
					className={
						hasError ?
							"text-destructive text-sm leading-4 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						:	"text-foreground text-sm leading-4 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
					}
				>
					{label}
				</p>
				<RadioGroup
					value={field.state.value}
					name={name}
					onValueChange={(e) => {
						field.handleChange(e.toLowerCase());
					}}
				>
					{radioButtons.map((radio) => {
						const radioStr = toStringOrThrow(radio);

						return (
							<div key={radioStr} className="flex items-center space-x-2">
								<RadioGroupItem value={radioStr} id={radioStr} />
								<Label htmlFor={radioStr}>{`${radioStr.charAt(0).toUpperCase() + radioStr.slice(1)}`}</Label>
							</div>
						);
					})}
				</RadioGroup>
			</div>
			{hasError ?
				<FormInputError meta={field.state.meta} />
			:	<FormInputDescription description={description} />}
		</div>
	);
}
