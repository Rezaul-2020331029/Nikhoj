import { LoginRequestSchema } from "@/domain/auth/login/login.schema";
import { useLogin } from "@/hooks/use-auth.hook";
import { AppForm } from "@/shared/layout/app-form.layout";
import { AppLink } from "@/shared/ui/app-link";
import { AppLogo } from "@/shared/ui/app-logo";

export function LoginUI() {
	const { mutateAsync } = useLogin();

	return (
		<AppForm
			formHeader={
				<div className="flex flex-col items-center justify-center">
					<AppLogo />
					<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl self-start">Login</h1>
				</div>
			}
			defaultValues={{ email: "", password: "" }}
			schema={LoginRequestSchema}
			onSubmit={async (values) => {
				await mutateAsync(values);
			}}
			formFooter={
				<p className="text-center">
					Do not have an account? &nbsp;&nbsp;&nbsp;&nbsp; <AppLink href="/signup">Signup</AppLink>
				</p>
			}
		>
			{(Form) => (
				<>
					<Form.AppField
						name="email"
						children={(field) => (
							<field.TextInput type="email" label="Email" description="Enter your email address" autoComplete="email" />
						)}
					/>
					<Form.AppField
						name="password"
						children={(field) => (
							<field.TextInput
								type="password"
								label="Password"
								description="Enter your password"
								autoComplete="current-password"
							/>
						)}
					/>
					<Form.AppForm>
						<Form.SubmitButton label="Login" />
					</Form.AppForm>
				</>
			)}
		</AppForm>
	);
}
