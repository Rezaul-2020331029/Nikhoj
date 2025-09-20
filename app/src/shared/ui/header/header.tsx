import { AppLinkButton } from "@/shared/ui/button/app-button";
import { AppLogo } from "@/shared/ui/app-logo";
import { Nav } from "@/shared/ui/header/nav";
import { useAuthStore } from "@/store/use-auth.store";

export function Header() {
	const { clearToken } = useAuthStore();
	return (
		<header className="sticky top-0 backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 border-b z-50 md:grid md:grid-cols-3 px-6 items-center">
			<AppLogo className="h-20 w-20" />

			<Nav>
				<nav className="flex-1 flex justify-between gap-4">
					<Nav.Button tab="lost">Lost</Nav.Button>
					<Nav.Button tab="found">Found</Nav.Button>
					<Nav.Button tab="search">Search</Nav.Button>
					<Nav.Button tab="create">Create</Nav.Button>
					<Nav.Button tab="message" className="md:hidden">
						Message
					</Nav.Button>
					<Nav.Button tab="menu" className="md:hidden">
						Menu
					</Nav.Button>
				</nav>
			</Nav>

			<AppLinkButton
				href="/"
				className="justify-self-end"
				variant="destructive"
				onClick={() => {
					clearToken();
				}}
			>
				Logout
			</AppLinkButton>
		</header>
	);
}
