import { Users, FileText, MapPin } from "lucide-react";
import { AppLogo } from "@/shared/ui/app-logo";

export const LoadingUI = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-10 left-10 w-20 h-20 border border-slate-300 rounded-full"></div>
				<div className="absolute top-32 right-20 w-16 h-16 border border-stone-300 rounded-full"></div>
				<div className="absolute bottom-20 left-32 w-12 h-12 border border-slate-300 rounded-full"></div>
				<div className="absolute bottom-40 right-10 w-24 h-24 border border-stone-300 rounded-full"></div>
			</div>

			{/* Main Loading Content */}
			<div className="text-center space-y-8 z-10 px-4 max-w-md mx-auto">
				{/* Logo and Brand */}
				<div className="space-y-3">
					<div className="relative mx-auto w-20 h-20 mb-6">
						{/* App Logo with Animations */}
						<div className="absolute inset-0 rounded-full bg-slate-200 flex items-center justify-center animate-pulse">
							<AppLogo className="w-full h-full" />
						</div>
						{/* Ripple Effect */}
						<div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-ping opacity-20"></div>
						<div className="absolute -inset-2 rounded-full border border-slate-200 animate-ping opacity-10 animation-delay-150"></div>
					</div>

					<h1 className="text-4xl font-bold text-destructive tracking-tight">নিখোঁজ</h1>
					<p className="text-lg text-slate-600 font-medium">Nikhoj</p>
					<p className="text-sm text-slate-500 leading-relaxed">Because What's Lost Still Matters</p>
				</div>

				{/* Loading Animation */}
				<div className="space-y-6">
					{/* Progress Bar */}
					<div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
						<div className="h-full bg-gradient-to-r from-slate-400 to-stone-500 rounded-full animate-pulse"></div>
					</div>

					{/* Feature Icons */}
					<div className="flex justify-center space-x-8">
						<div className="flex flex-col items-center space-y-2 opacity-60 animate-bounce animation-delay-0">
							<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
								<Users className="w-5 h-5 text-slate-600" />
							</div>
							<span className="text-xs text-slate-500">People</span>
						</div>

						<div className="flex flex-col items-center space-y-2 opacity-60 animate-bounce animation-delay-200">
							<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
								<FileText className="w-5 h-5 text-slate-600" />
							</div>
							<span className="text-xs text-slate-500">Documents</span>
						</div>

						<div className="flex flex-col items-center space-y-2 opacity-60 animate-bounce animation-delay-400">
							<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
								<MapPin className="w-5 h-5 text-slate-600" />
							</div>
							<span className="text-xs text-slate-500">Location</span>
						</div>
					</div>
				</div>

				{/* Loading Text */}
				<div className="space-y-2">
					<div className="flex justify-center items-center space-x-1">
						<span className="text-slate-600 text-sm">Loading</span>
						<div className="flex space-x-1">
							<div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce animation-delay-0"></div>
							<div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce animation-delay-100"></div>
							<div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce animation-delay-200"></div>
						</div>
					</div>

					{/* Inspiring Message */}
					<p className="text-xs text-slate-400 italic">Connecting hope with technology</p>
				</div>
			</div>

			{/* Footer */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
				<p className="text-xs text-slate-400 text-center">Building bridges between the lost and found</p>
			</div>

			<style>{`
				.animation-delay-0 {
					animation-delay: 0ms;
				}
				.animation-delay-100 {
					animation-delay: 100ms;
				}
				.animation-delay-150 {
					animation-delay: 150ms;
				}
				.animation-delay-200 {
					animation-delay: 200ms;
				}
				.animation-delay-400 {
					animation-delay: 400ms;
				}
			`}</style>
		</div>
	);
};


