import { SubmitButton } from "@/shared/ui/button/submit-button";
import { ImageInput } from "@/shared/ui/input/image-input";
import { RadioInput } from "@/shared/ui/input/radio-input";
import { SelectInput } from "@/shared/ui/input/select-input";
import { TextInput } from "@/shared/ui/input/text-input";
import { TextareaInput } from "@/shared/ui/input/textarea-input";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,

	fieldComponents: {
		TextInput,
		TextareaInput,
		RadioInput,
		SelectInput,
		ImageInput,
	},
	formComponents: {
		SubmitButton,
	},
});
