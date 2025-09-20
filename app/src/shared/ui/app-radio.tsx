import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toStringOrThrow } from "@/shared/utils/to-string";

export type AppRadioProps<T> = {
	radioButtons: T[];
	value?: string;
	onRadioChange?: (value: T) => void;
};

export function AppRadio<T>({ radioButtons, onRadioChange, value }: AppRadioProps<T>) {
	const toActualOrThrow = (val: string): T => {
		try {
			return val as T;
		} catch (error) {
			console.error("AppRadio Error:", error);
			throw new Error(`The type of ${val} cannot be converted to the expected type.`);
		}
	};

	return (
		<RadioGroup
			value={value ?? ""}
			onValueChange={(val) => {
				const radio = toActualOrThrow(val);
				onRadioChange?.(radio);
			}}
		>
			{radioButtons.map((radio) => {
				const radioStr = toStringOrThrow(radio);

				return (
					<div key={radioStr} className="flex items-center space-x-2">
						<RadioGroupItem value={radioStr} id={radioStr} />
						<Label htmlFor={radioStr}>{radioStr}</Label>
					</div>
				);
			})}
		</RadioGroup>
	);
}
