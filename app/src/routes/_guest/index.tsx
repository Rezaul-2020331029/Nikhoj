import { createFileRoute } from "@tanstack/react-router";
import LandingUI from "@/presentation/landing/landing.ui";

export const Route = createFileRoute("/_guest/")({
	component: Home,
});

function Home() {
	return <LandingUI />;
}
