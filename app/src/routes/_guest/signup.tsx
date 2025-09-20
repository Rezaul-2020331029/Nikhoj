import { SignupUI } from "@/presentation/auth/signup/signup.ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/signup")({
	component: Signup,
});

function Signup() {
	return <SignupUI />;
}
