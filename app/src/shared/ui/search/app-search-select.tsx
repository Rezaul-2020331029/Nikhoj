import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type AppSearchSelectProps = {
	selectors: string[];
	defaultValue?: string;
	title: string;
	onSelectChange: (val: string) => void;
};

export function AppSearchSelect({ selectors, onSelectChange, title, defaultValue = "" }: AppSearchSelectProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [value, setValue] = React.useState(defaultValue);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={isOpen}
					className="cursor-pointer flex justify-between"
				>
					{value ? selectors.find((select) => select === value) : `Select a ${title}`}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			{isOpen ?
				<PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
					<Command>
						<CommandInput placeholder={`Select a ${title}`} className="h-9" />
						<CommandList>
							<CommandEmpty>No {title} found.</CommandEmpty>
							<CommandGroup>
								{selectors.map((select) => (
									<CommandItem
										key={select}
										value={select}
										onSelect={(currentValue) => {
											setIsOpen(false);
											setValue(currentValue === value ? "" : currentValue);
											onSelectChange(currentValue === value ? "" : currentValue);
										}}
									>
										{select}
										<Check className={cn("ml-auto", value === select ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			:	null}
		</Popover>
	);
}
