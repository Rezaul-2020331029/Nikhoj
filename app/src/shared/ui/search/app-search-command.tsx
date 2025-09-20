import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useState } from "react";

export type AppSearchCommandPrompt<T> = {
	title: string;
	selectors: { key: T; value: string }[];
	onCommandChange: (key: T | null) => void; // Changed to return key instead of string
	defaultKey?: T; // Changed from defaultValue to defaultKey
};

export function AppSearchCommand<T>({ title, selectors, onCommandChange, defaultKey }: AppSearchCommandPrompt<T>) {
	const [selectedKey, setSelectedKey] = useState<T | null>(defaultKey ?? null);
	const [input, setInput] = useState("");

	// Find the display value for the selected key
	const selectedItem = selectedKey !== null ? selectors.find((s) => s.key === selectedKey) : null;
	const displayValue = selectedItem?.value || "";

	const handleClear = () => {
		setSelectedKey(null);
		setInput("");
		onCommandChange(null);
	};

	const handleSelect = (item: { key: T; value: string }) => {
		const isAlreadySelected = selectedKey === item.key;

		if (isAlreadySelected) {
			// Deselect if clicking the same item
			setSelectedKey(null);
			setInput("");
			onCommandChange(null);
		} else {
			// Select new item
			setSelectedKey(item.key);
			setInput(item.value);
			onCommandChange(item.key);
		}
	};

	const isSelected = selectedKey !== null;
	const isInputReadOnly = isSelected && input === displayValue && input !== "";

	return (
		<Command>
			<div className="relative">
				<CommandInput
					placeholder={`Select a ${title}`}
					value={input}
					onValueChange={(val) => {
						setInput(val);
					}}
					className="h-9"
					readOnly={isInputReadOnly}
				/>
				<X
					className={cn(
						"absolute right-0 top-3 text-muted-foreground cursor-pointer w-5 h-5 transition-opacity",
						isSelected ? "opacity-100" : "opacity-0"
					)}
					onClick={handleClear}
				/>
			</div>
			<CommandList>
				<CommandEmpty>No {title} found.</CommandEmpty>
				<CommandGroup>
					{selectors.map((item) => {
						const isItemSelected = selectedKey === item.key;

						return (
							<CommandItem
								key={String(item.key)}
								value={`${String(item.key)}__${item.value}`}
								onSelect={() => handleSelect(item)}
							>
								{item.value}
								<Check className={cn("ml-auto transition-opacity", isItemSelected ? "opacity-100" : "opacity-0")} />
							</CommandItem>
						);
					})}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
