import { useEffect, useRef, createContext, use, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { PostsViewModel } from "@/services/post/post.viewmodel";
import { Posts } from "@/presentation/post/posts.ui";

function useIndependentScroll({ leftRef, mainRef, rightRef }: AppLayoutContextRef) {
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			const target = e.target as Node;

			const scrollableColumn =
				leftRef.current?.contains(target) ? leftRef.current
				: mainRef.current?.contains(target) ? mainRef.current
				: rightRef.current?.contains(target) ? rightRef.current
				: null;

			if (!scrollableColumn) return;

			e.preventDefault();
			scrollableColumn.scrollBy({
				top: e.deltaY,
				behavior: "auto",
			});
		};

		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	}, [leftRef, mainRef, rightRef]);
}

type AppLayoutContextRef = {
	containerRef: React.RefObject<HTMLElement | null>;
	leftRef: React.RefObject<HTMLDivElement | null>;
	mainRef: React.RefObject<HTMLElement | null>;
	rightRef: React.RefObject<HTMLDivElement | null>;
};

const AppLayoutContext = createContext<AppLayoutContextRef | null>(null);

const useAppLayoutContext = () => {
	const context = use(AppLayoutContext);

	if (!context) {
		throw new Error("<AppLayout.* /> must be used inside <AppLayout />");
	}

	return context;
};

type AppLayoutProps = {
	Left?: React.ReactNode;
	Main?: React.ReactNode;
	Right?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function AppLayout({ Left, Main, Right, ...inputProps }: AppLayoutProps) {
	const containerRef = useRef<HTMLElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	useIndependentScroll({ leftRef, mainRef, rightRef, containerRef });

	const { className, ...otherProps } = { ...inputProps };
	return (
		<AppLayoutContext value={{ containerRef, leftRef, mainRef, rightRef }}>
			<section
				ref={containerRef}
				className={cn("top-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 h-[calc(100vh-6rem)]", className)}
				{...otherProps}
			>
				{Left}
				{Main}
				{Right}
			</section>
		</AppLayoutContext>
	);
}

type SideLayoutProps = {
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

function Left({ children, ...inputProps }: SideLayoutProps) {
	const { className, ...otherProps } = { ...inputProps };
	const { leftRef } = useAppLayoutContext();
	return (
		<aside className={cn("h-full overflow-y-auto border rounded-md p-6", className)} {...otherProps} ref={leftRef}>
			{children}
		</aside>
	);
}

function Right({ children, ...inputProps }: SideLayoutProps) {
	const { className, ...otherProps } = { ...inputProps };
	const { rightRef } = useAppLayoutContext();
	return (
		<aside className={cn("h-full overflow-y-auto border rounded-md", className)} {...otherProps} ref={rightRef}>
			{children}
		</aside>
	);
}

function useVirtualizerState() {
	const { mainRef } = useAppLayoutContext();

	const [ready, setReady] = useState(false);

	useLayoutEffect(() => {
		if (mainRef.current) {
			setReady(true);
		}
	}, [mainRef]);

	return { mainRef, ready };
}

type MainLayoutProps = {
	children?: React.ReactNode;
	posts?: PostsViewModel;
	hasNextPage?: boolean;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
} & React.HTMLAttributes<HTMLElement>;

function Main({ children, posts, hasNextPage, fetchNextPage, isFetchingNextPage, ...inputProps }: MainLayoutProps) {
	const { className, ...otherProps } = { ...inputProps };
	const { mainRef } = useVirtualizerState();

	return (
		<main className={cn("relative h-full overflow-y-auto", className)} {...otherProps} ref={mainRef}>
			{children}
			{posts && (
				<Posts
					scrollRef={mainRef}
					posts={posts}
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
			)}
		</main>
	);
}

AppLayout.Left = Left;
AppLayout.Main = Main;
AppLayout.Right = Right;
