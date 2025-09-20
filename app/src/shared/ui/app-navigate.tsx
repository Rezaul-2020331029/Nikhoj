import { Navigate } from "@tanstack/react-router";

export function AppNavigate({ href, search }: { href: string; search?: Record<string, unknown> }) {
	return <Navigate to={href} search={search} />;
}
