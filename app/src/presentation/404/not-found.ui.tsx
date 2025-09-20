import { Search, Home, ArrowLeft, MapPin, Users, FileText } from "lucide-react";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppLogo } from "@/shared/ui/app-logo";
import { useRouter } from "@tanstack/react-router";
import { AppCard } from "@/shared/ui/app-card";

export const NotFoundUI = () => {
	const router = useRouter();

	const handleGoBack = () => {
		if (router.history.canGoBack()) {
			router.navigate({ replace: true });
			router.history.back();
		} else {
			router.navigate({ to: "/", replace: true });
		}
	};

	const handleGoHome = () => {
		router.navigate({ to: "/", replace: true });
	};

	const handleStartSearch = () => {
		router.navigate({
			to: "/home",
			search: {
				tab: "lost",
				date: undefined,
				search: undefined,
				category: undefined,
				location: undefined,
				threadId: undefined,
			},
			replace: true,
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-16 w-32 h-32 border border-slate-300 rounded-full"></div>
				<div className="absolute top-40 right-32 w-24 h-24 border border-stone-300 rounded-full"></div>
				<div className="absolute bottom-32 left-40 w-20 h-20 border border-slate-300 rounded-full"></div>
				<div className="absolute bottom-16 right-16 w-28 h-28 border border-stone-300 rounded-full"></div>
				<div className="absolute top-1/2 left-1/4 w-16 h-16 border border-slate-200 rounded-full"></div>
			</div>

			{/* Main Content */}
			<div className="text-center space-y-8 z-10 px-4 max-w-2xl mx-auto">
				{/* Logo Section */}

				<div className="space-y-1">
					<h1 className="text-2xl font-bold text-destructive">নিখোঁজ</h1>
					<p className="text-sm text-slate-600">Nikhoj</p>
				</div>

				{/* 404 Error */}
				<div className="space-y-4">
					<div className="relative flex items-center justify-center gap-4">
						<span className="text-8xl font-bold text-slate-300 select-none">4</span>

						{/* App Logo as the middle "0" with ripple effect */}
						<div className="relative w-20 h-20">
							<div className="absolute inset-0 rounded-full bg-slate-200 flex items-center justify-center animate-pulse">
								<AppLogo className="w-full h-full" />
							</div>
							{/* Ripple Effect */}
							<div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-ping opacity-20"></div>
							<div className="absolute -inset-2 rounded-full border border-slate-200 animate-ping opacity-10 animation-delay-150"></div>
						</div>

						<span className="text-8xl font-bold text-slate-300 select-none">4</span>
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-semibold text-slate-800">Page Not Found</h3>
						<p className="text-slate-600 leading-relaxed max-w-md mx-auto">
							It seems like what you're looking for has gone missing. Just like we help find lost people and items, let
							us help you find your way back.
						</p>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<AppButton
							onClick={handleGoHome}
							className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
						>
							<Home className="w-4 h-4" />
							Go Home
						</AppButton>
						<AppButton
							onClick={handleGoBack}
							variant="outline"
							className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Go Back
						</AppButton>
					</div>

					<div className="pt-2">
						<AppButton
							onClick={handleStartSearch}
							variant="ghost"
							className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
						>
							<Search className="w-4 h-4" />
							Start Searching
						</AppButton>
					</div>
				</div>

				{/* Quick Links */}
				<AppCard>
					<>
						<h4 className="text-sm font-semibold text-slate-700 mb-4 text-center">
							Or explore what we can help you find
						</h4>
						<div className="grid grid-cols-3 gap-4">
							<button
								onClick={() => (window.location.href = "/missing-persons")}
								className="group flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-colors"
							>
								<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
									<Users className="w-5 h-5 text-slate-600" />
								</div>
								<span className="text-xs text-slate-600 font-medium">Missing Persons</span>
							</button>

							<button
								onClick={() => (window.location.href = "/lost-documents")}
								className="group flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-colors"
							>
								<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
									<FileText className="w-5 h-5 text-slate-600" />
								</div>
								<span className="text-xs text-slate-600 font-medium">Lost Documents</span>
							</button>

							<button
								onClick={() => (window.location.href = "/lost-items")}
								className="group flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-colors"
							>
								<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
									<MapPin className="w-5 h-5 text-slate-600" />
								</div>
								<span className="text-xs text-slate-600 font-medium">Lost Items</span>
							</button>
						</div>
					</>
				</AppCard>

				{/* Footer Message */}
				<div className="pt-4">
					<p className="text-xs text-slate-400 italic">Every search brings hope closer to home</p>
				</div>
			</div>

			{/* Floating Elements */}
			<div className="absolute top-1/4 right-8 opacity-10 animate-float">
				<div className="w-6 h-6 bg-slate-300 rounded-full"></div>
			</div>
			<div className="absolute bottom-1/4 left-8 opacity-10 animate-float animation-delay-1000">
				<div className="w-4 h-4 bg-stone-300 rounded-full"></div>
			</div>

			<style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
		</div>
	);
};