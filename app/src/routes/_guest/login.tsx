import { LoginUI } from "@/presentation/auth/login/login.ui";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/login")({
	component: Login,
});

function Login() {
	return <LoginUI />;
}
