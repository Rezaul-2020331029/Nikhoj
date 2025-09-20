import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { AppFormInstance } from "@/shared/layout/app-form.layout";
import { DialogDescription } from "@radix-ui/react-dialog";

type AppDialogBaseProps = {
	title: string;
	description?: string;
	openDialog: React.ReactNode;
	closeDialog: React.ReactNode;
};

type FormDialogProps<T> = AppDialogBaseProps & {
	FormContext: React.ComponentType<{
		children: (form: AppFormInstance<T>) => React.ReactNode;
	}>;
	dialogContent: (form: AppFormInstance<T>) => React.ReactNode;
	dialogFooter: (form: AppFormInstance<T>) => React.ReactNode;
};

type AppDialogWithoutForm = AppDialogBaseProps & {
	FormContext?: undefined;
	dialogContent: React.ReactNode;
	dialogFooter?: React.ReactNode;
};

type DialogStateProps = {
	isOpen: boolean;
	setIsOpen: (o: boolean) => void;
};

type AppDialogProps<T> = (FormDialogProps<T> | AppDialogWithoutForm) & DialogStateProps;

export function AppDialog<T>({
	isOpen,
	setIsOpen,
	FormContext,
	title,
	description,
	openDialog,
	dialogContent,
	closeDialog,
	dialogFooter,
}: AppDialogProps<T>) {
	return (
		<Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			{FormContext ?
				<FormDialog
					FormContext={FormContext}
					title={title}
					description={description}
					openDialog={openDialog}
					dialogContent={dialogContent}
					dialogFooter={dialogFooter}
					closeDialog={closeDialog}
				/>
			:	<>
					<DialogTrigger asChild>{openDialog}</DialogTrigger>
					<DialogContent className="sm:max-w-[400px]">
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						{dialogContent}
						<DialogFooter>
							<DialogClose asChild>{closeDialog}</DialogClose>
							{dialogFooter}
						</DialogFooter>
					</DialogContent>
				</>
			}
		</Dialog>
	);
}

function FormDialog<T>({
	FormContext,
	title,
	description = "",
	openDialog,
	dialogContent,
	closeDialog,
	dialogFooter,
}: FormDialogProps<T>) {
	return (
		<>
			<DialogTrigger asChild>{openDialog}</DialogTrigger>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<FormContext>
					{(form) => (
						<>
							{dialogContent(form)}
							<DialogFooter className="flex gap-4 ice">
								<DialogClose asChild>{closeDialog}</DialogClose>
								{dialogFooter(form)}
							</DialogFooter>
						</>
					)}
				</FormContext>
			</DialogContent>
		</>
	);
}
