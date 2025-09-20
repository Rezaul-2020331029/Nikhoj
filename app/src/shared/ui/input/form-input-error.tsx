import type { AnyFieldMeta } from "@tanstack/react-form";

type FieldErrorsProps = {
	meta: AnyFieldMeta;
};

export const FormInputError = ({ meta }: FieldErrorsProps) => {
	if (!meta.isTouched || !meta.errors.length) return null;


	const firstError = meta.errors[0];

	return (
		<p className="text-sm font-medium text-destructive" role="alert" aria-live="polite">
			{firstError.message}
		</p>
	);
};
