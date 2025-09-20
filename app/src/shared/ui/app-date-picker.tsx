import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalenderIcon } from "lucide-react";
import { format } from "date-fns";

type AppDatePickerProps = {
	date?: Date;
	onDateChange: (date?: Date) => void;
};

type DatePickerState = {
	date: Date | undefined;
	isOpen: boolean;
	dirty: boolean;
};

// Define action types
type DatePickerAction = { type: "SET_DATE"; payload: Date | undefined } | { type: "SET_IS_OPEN"; payload: boolean };

// Reducer function
function datePickerReducer(state: DatePickerState, action: DatePickerAction): DatePickerState {
	switch (action.type) {
		case "SET_DATE":
			return { ...state, date: action.payload, dirty: true };
		case "SET_IS_OPEN":
			return { ...state, isOpen: action.payload };
		default:
			return state;
	}
}

export function AppDatePicker({ date: inputDate, onDateChange }: AppDatePickerProps) {
	const [state, dispatch] = React.useReducer(datePickerReducer, {
		date: inputDate,
		isOpen: false,
		dirty: false,
	});

	return (
		<Popover
			open={state.isOpen}
			onOpenChange={(isOpen) => {
				dispatch({ type: "SET_IS_OPEN", payload: isOpen });
			}}
		>
			<PopoverTrigger asChild>
				<Button variant="outline" className="flex items-center justify-center gap-6 cursor-pointer">
					{state.date ? format(state.date, "MMMM d, yyyy") : "Select Date"} <CalenderIcon />
				</Button>
			</PopoverTrigger>

			{state.isOpen ?
				<PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
					<Calendar
						mode="single"
						captionLayout="dropdown"
						selected={state.date}
						onSelect={(d) => {
							dispatch({
								type: "SET_IS_OPEN",
								payload: false,
							});
							dispatch({
								type: "SET_DATE",
								payload: d,
							});
							onDateChange(d);
						}}
						disabled={{ after: new Date() }}
					/>
				</PopoverContent>
			:	null}
		</Popover>
	);
}
