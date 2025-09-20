import { SignupRequestSchema } from "@/domain/auth/signup/signup.schema";
import { useSignup } from "@/hooks/use-auth.hook";
import { AppForm } from "@/shared/layout/app-form.layout";
import { AppLink } from "@/shared/ui/app-link";
import { AppLogo } from "@/shared/ui/app-logo";

export function SignupUI() {
	const { mutateAsync } = useSignup();
	return (
		<AppForm
			formHeader={
				<div className="flex flex-col items-center justify-center">
					<AppLogo />
					<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl self-start">Signup</h1>
				</div>
			}
			defaultValues={{ name: "", email: "", password: "" }}
			schema={SignupRequestSchema}
			onSubmit={async (values) => {
				await mutateAsync(values);
			}}
			formFooter={
				<p className="text-center">
					Already have an account? &nbsp;&nbsp;&nbsp;&nbsp; <AppLink href="/login">Login</AppLink>
				</p>
			}
		>
			{(Form) => (
				<>
					<Form.AppField
						name="name"
						children={(field) => (
							<field.TextInput
								type="text"
								label="Full Name"
								description="Enter your full name"
								autoComplete="current"
							/>
						)}
					/>
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
						<Form.SubmitButton label="Signup" />
					</Form.AppForm>
				</>
			)}
		</AppForm>
	);
}
