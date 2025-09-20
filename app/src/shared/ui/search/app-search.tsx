import { useId, useRef, useState } from "react";
import { ArrowRightIcon, SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type AppSearchProps = {
	onSearch: (search: string) => void;
	placeholder?: string;
	defaultValue?: string;
};

export function AppSearch({ onSearch, placeholder, defaultValue = "" }: AppSearchProps) {
	const id = useId();
	const ref = useRef<HTMLInputElement | null>(null);
	const [search, setSearch] = useState<string>(defaultValue);

	return (
		<form
			className="relative"
			onSubmit={(e) => {
				e.preventDefault();
				ref.current?.blur();
				onSearch(search);
			}}
		>
			<Input
				id={id}
				ref={ref}
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				name="search"
				className="ps-9 pe-9 focus:*-none focus:outline-none active:outline-none"
				placeholder={placeholder ?? "Search..."}
				type="search"
				autoComplete="off"
			/>
			<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
				<SearchIcon size={16} />
			</div>
			<button
				className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 bg-none"
				aria-label="Submit search"
				type="submit"
			>
				{search ?
					<X
						size={16}
						aria-hidden="true"
						onClick={() => {
							setSearch("");
						}}
						className="cursor-pointer"
					/>
				:	<ArrowRightIcon size={16} aria-hidden="true" className="cursor-pointer" />}
			</button>
		</form>
	);
}
