import React from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Bug, Wifi, Server } from "lucide-react";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppCard } from "@/shared/ui/app-card";
import { AppLogo } from "@/shared/ui/app-logo";
import { useRouter } from "@tanstack/react-router";

interface ErrorPageProps {
	error?: Error;
	resetError?: () => void;
}

export const ErrorUI: React.FC<ErrorPageProps> = ({ error, resetError }) => {
	const handleRefresh = () => {
		if (resetError) {
			resetError();
		} else {
			router.invalidate();
		}
	};

	const router = useRouter();

	const handleGoBack = () => {
		router.history.back();
	};

	const handleGoHome = () => {
		router.navigate({ to: "/", replace: true });
	};

	// Extract error details
	const getErrorDetails = () => {
		if (!error?.message) {
			return {
				title: "Something went wrong",
				description: "An unexpected error occurred while processing your request.",
				type: "unknown",
			};
		}

		const message = error.message;

		// Parse different error types based on your query client error format
		if (message.includes("Network Error") || message.includes("ERR_NETWORK")) {
			return {
				title: "Connection Problem",
				description: "Unable to connect to our servers. Please check your internet connection.",
				type: "network",
			};
		}

		if (message.includes("500:") || message.includes("Internal Server Error")) {
			return {
				title: "Server Error",
				description: "Our servers are experiencing issues. We're working to fix this.",
				type: "server",
			};
		}

		if (message.includes("404:") || message.includes("Not Found")) {
			return {
				title: "Resource Not Found",
				description: "The information you're looking for couldn't be found.",
				type: "notfound",
			};
		}

		if (message.includes("403:") || message.includes("Forbidden")) {
			return {
				title: "Access Denied",
				description: "You don't have permission to access this resource.",
				type: "forbidden",
			};
		}

		if (message.includes("401:") || message.includes("Unauthorized")) {
			return {
				title: "Authentication Required",
				description: "Please log in to access this feature.",
				type: "auth",
			};
		}

		// Default for any other error
		return {
			title: "Unexpected Error",
			description: message.replace(/^\d+:\s*/, ""), // Remove status code prefix if present
			type: "general",
		};
	};

	const errorDetails = getErrorDetails();

	const getErrorIcon = () => {
		switch (errorDetails.type) {
			case "network":
				return <Wifi className="w-8 h-8 text-orange-500" />;
			case "server":
				return <Server className="w-8 h-8 text-red-500" />;
			case "auth":
			case "forbidden":
				return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
			default:
				return <Bug className="w-8 h-8 text-slate-500" />;
		}
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
				<div className="space-y-4">
					<div className="relative mx-auto w-16 h-16 mb-6">
						<div className="absolute inset-0 rounded-full bg-slate-200 flex items-center justify-center animate-pulse">
							<AppLogo className="w-full h-full" />
						</div>
						{/* Ripple Effect */}
						<div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-ping opacity-20"></div>
						<div className="absolute -inset-2 rounded-full border border-slate-200 animate-ping opacity-10 animation-delay-150"></div>
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-bold text-destructive">নিখোঁজ</h1>
						<p className="text-sm text-slate-600">Nikhoj</p>
					</div>
				</div>

				{/* Error Display */}
				<div className="space-y-6">
					<div className="flex justify-center">
						<div className="p-4 bg-slate-100 rounded-full">{getErrorIcon()}</div>
					</div>

					<div className="space-y-3">
						<h2 className="text-2xl font-semibold text-slate-800">{errorDetails.title}</h2>
						<p className="text-slate-600 leading-relaxed max-w-md mx-auto">{errorDetails.description}</p>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<AppButton
							onClick={handleRefresh}
							className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
						>
							<RefreshCw className="w-4 h-4" />
							Try Again
						</AppButton>
						<AppButton
							onClick={handleGoHome}
							variant="outline"
							className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
						>
							<Home className="w-4 h-4" />
							Go Home
						</AppButton>
					</div>

					<div className="pt-2">
						<AppButton
							onClick={handleGoBack}
							variant="ghost"
							className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Go Back
						</AppButton>
					</div>
				</div>

				{/* Error Details Card */}
				{process.env.NODE_ENV === "development" && error && (
					<AppCard className="bg-red-50/50 backdrop-blur-sm border-red-200 text-left">
						<div className="p-4">
							<h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
								<Bug className="w-4 h-4" />
								Development Error Details
							</h4>
							<div className="text-xs text-red-700 font-mono bg-red-100 p-3 rounded border overflow-x-auto">
								<div className="whitespace-pre-wrap break-all">{error.message}</div>
								{error.stack && (
									<details className="mt-2">
										<summary className="cursor-pointer font-semibold">Stack Trace</summary>
										<div className="mt-2 text-xs">{error.stack}</div>
									</details>
								)}
							</div>
						</div>
					</AppCard>
				)}

				{/* Footer Message */}
				<div className="pt-4">
					<p className="text-xs text-slate-400 italic">We're working hard to keep your searches running smoothly</p>
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
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-20px);
					}
				}
			`}</style>
		</div>
	);
};
