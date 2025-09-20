import { cn } from "@/lib/utils";
import { useAppForm } from "@/shared/form";
import type { FormAsyncValidateOrFn, FormValidateOrFn, StandardSchemaV1 } from "@tanstack/react-form";

export type AppFormInstance<Type> = ReturnType<
	typeof useAppForm<
		Type,
		FormValidateOrFn<Type> | undefined,
		FormValidateOrFn<Type> | StandardSchemaV1<Type, unknown>,
		FormValidateOrFn<Type> | StandardSchemaV1<Type, unknown>,
		FormValidateOrFn<Type> | undefined,
		FormAsyncValidateOrFn<Type> | undefined,
		FormValidateOrFn<Type> | undefined,
		FormValidateOrFn<Type> | undefined,
		FormValidateOrFn<Type> | undefined,
		FormAsyncValidateOrFn<Type> | undefined,
		FormValidateOrFn<Type> | undefined,
		unknown
	>
>;

type AppFormProps<Type> = {
	formHeader?: React.ReactNode;
	defaultValues: Type;
	schema: FormValidateOrFn<Type>;
	children: (form: AppFormInstance<Type>) => React.ReactNode;
	onSubmit: (values: Type) => Promise<unknown>;
	formFooter?: React.ReactNode;
	layoutProps?: React.HTMLAttributes<HTMLElement>;
	formProps?: React.HTMLAttributes<HTMLElement>;
};

export function AppForm<Type>({
	formHeader,
	defaultValues,
	schema,
	children,
	onSubmit,
	formFooter,
	layoutProps,
	formProps,
}: AppFormProps<Type>) {
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: schema,
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			return await onSubmit(value);
		},
	});

	const { className: layoutClassName, ...otherLayoutProps } = { ...layoutProps };
	const { className: formClassName, ...otherFormProps } = { ...formProps };

	return (
		<form.AppForm>
			<section
				className={cn("w-full max-w-[400px] h-auto mx-auto flex flex-col gap-12 p-4", layoutClassName)}
				{...otherLayoutProps}
			>
				{formHeader}
				<form
					className={cn("flex flex-col gap-4 justify-center", formClassName)}
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					{...otherFormProps}
				>
					{children(form)}
				</form>
				{formFooter}
			</section>
		</form.AppForm>
	);
}
