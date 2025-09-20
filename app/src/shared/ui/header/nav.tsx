import { createContext, use } from "react";
import { AppButton } from "@/shared/ui/button/app-button";
import { useSearch } from "@tanstack/react-router";
import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";

const NavContext = createContext<{
	tab: "search" | "lost" | "found" | "create" | "message" | "menu";
	setTab: (tab: "search" | "lost" | "found" | "create" | "message" | "menu") => void;
} | null>(null);

function useNavContext() {
	const context = use(NavContext);
	if (!context) {
		throw Error("Nav.* component must be used inside a NavContext");
	}
	return context;
}

function NavButton({
	tab,
	children,
	className,
}: {
	tab: "search" | "lost" | "found" | "create" | "message" | "menu";
	children: React.ReactNode;
	className?: string;
}) {
	const { tab: activeTab, setTab } = useNavContext();

	return (
		<AppButton
			onClick={() => setTab(tab)}
			data-active={activeTab === tab}
			variant={tab === activeTab ? "default" : "secondary"}
			className={className ?? ""}
		>
			{children}
		</AppButton>
	);
}

export function Nav({ children }: { children: React.ReactNode }) {
	const setHomeRoute = useSetHomeRoute();
	const { tab } = useSearch({ from: "/_auth/home" });

	// Get tab from search params or default to "lost"
	const currentTab = tab;

	const setTab = (newTab: "search" | "lost" | "found" | "create" | "message" | "menu") => {
		setHomeRoute({ tab: newTab });
	};

	return <NavContext.Provider value={{ tab: currentTab, setTab }}>{children}</NavContext.Provider>;
}

// Export as compound component
Nav.Button = NavButton;
