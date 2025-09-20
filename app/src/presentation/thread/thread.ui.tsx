import { CreateThreadRequestSchema } from "@/domain/thread/thread.schema";
import { useCreateThread, useGetAllThread } from "@/hooks/use-thread.hook";
import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";
import { AppForm } from "@/shared/layout/app-form.layout";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppDialog } from "@/shared/ui/app-dialog";
import { AppTitle } from "@/shared/ui/app-title";
import { useSearch } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { AppSearchCommand } from "@/shared/ui/search/app-search-command";
import { useEffect, useState } from "react";

export function ThreadUI() {
	const { threadId, tab } = useSearch({ from: "/_auth/home" });
	const setHomeRoute = useSetHomeRoute();
	const { data: threads } = useGetAllThread();

	const handleThreadIdChange = (threadId: number | null) => {
		setHomeRoute({ threadId: threadId ? String(threadId) : "", tab });
	};

	return (
		<article className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<AppTitle title="Threads" />
				<ThreadDialog />
			</div>
			<div className="max-h-full overflow-y-visible">
				<AppSearchCommand
					title="Thread"
					selectors={threads.map((t) => ({ key: t.id, value: t.title }))}
					onCommandChange={handleThreadIdChange}
					defaultKey={threadId ? Number(threadId) : undefined}
				/>
			</div>
		</article>
	);
}

function ThreadDialog() {
	const { mutateAsync, isSuccess, isPending } = useCreateThread();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [isSuccess]);

	return (
		<AppDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			FormContext={({ children }) => (
				<AppForm
					defaultValues={{ title: "", description: "", location: "" }}
					schema={CreateThreadRequestSchema}
					onSubmit={async (values) => {
						await mutateAsync(values);
					}}
				>
					{(form) => children(form)}
				</AppForm>
			)}
			title="Create Thread"
			openDialog={
				<AppButton>
					<PlusIcon />
				</AppButton>
			}
			dialogContent={(form) => (
				<>
					<form.AppField name="title">
						{(field) => (
							<field.TextInput label="Title" description="Enter the title of your thread" autoComplete="off" />
						)}
					</form.AppField>

					<form.AppField name="description">
						{(field) => (
							<field.TextareaInput
								label="Description"
								description="Provide a brief description of the thread"
								autoComplete="off"
								className="min-h-0 field-sizing-content"
							/>
						)}
					</form.AppField>

					<form.AppField name="location">
						{(field) => (
							<field.TextInput label="Location" description="Specify the location for the thread" autoComplete="off" />
						)}
					</form.AppField>
				</>
			)}
			dialogFooter={(form) => (
				<form.AppForm>
					<form.SubmitButton label="Create Thread" className="mt-0" disabled={isPending} />
				</form.AppForm>
			)}
			closeDialog={<AppButton variant="destructive">Cancel</AppButton>}
		></AppDialog>
	);
}
