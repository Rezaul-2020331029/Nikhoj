import { cn } from "@/lib/utils";
import { useFormContext } from "@/shared/form";
import { AppButton } from "@/shared/ui/button/app-button";
import { Loader } from "lucide-react";

type SubmitButtonProps = {
	label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ label, ...inputProps }: SubmitButtonProps) {
	const { className: inputClassName, ...otherProps } = { ...inputProps };
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				canSubmit: state.canSubmit,
				isSubmitted: state.submissionAttempts > 0,
			})}
		>
			{({ isSubmitting, canSubmit, isSubmitted }) => (
				<AppButton
					type="submit"
					disabled={isSubmitted && (!canSubmit || isSubmitting)}
					aria-disabled={isSubmitted && (!canSubmit || isSubmitting)}
					className={cn(
						"mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-500",
						inputClassName
					)}
					{...otherProps}
				>
					{isSubmitting ?
						<Loader />
					:	label}
				</AppButton>
			)}
		</form.Subscribe>
	);
}
