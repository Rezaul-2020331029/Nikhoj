import { MessageCircle, Heart } from "lucide-react";

import { AppLogo } from "@/shared/ui/app-logo";

export const MessageEmptyUI = () => {
	return (
		<div className="h-full bg-gradient-to-br from-slate-50 to-stone-100 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<MessageCircle className="w-6 h-6 text-slate-600" />
					<div>
						<h2 className="font-semibold text-slate-800">Messages</h2>
						<p className="text-sm text-slate-500">Connect and help each other</p>
					</div>
				</div>
			</div>

			{/* Main Empty State */}
			<div className="flex-1 flex items-center justify-center p-6">
				<div className="text-center space-y-8 max-w-md mx-auto">
					{/* Logo with Animation */}
					<div className="relative mx-auto w-20 h-20 mb-6">
						<div className="absolute inset-0 rounded-full bg-slate-100 flex items-center justify-center">
							<AppLogo className="w-12 h-12" />
						</div>
						{/* Gentle Pulse Effect */}
						<div className="absolute inset-0 rounded-full border-2 border-slate-200 animate-pulse opacity-30"></div>
						<div className="absolute -inset-2 rounded-full border border-slate-150 animate-pulse opacity-15 animation-delay-500"></div>
					</div>

					{/* Main Message */}
					<div className="space-y-3">
						<h3 className="text-2xl font-semibold text-slate-800 flex items-center justify-center gap-2">
							Start Connecting
							<Heart className="w-5 h-5 text-red-400" />
						</h3>
						<p className="text-slate-600 leading-relaxed">
							Your conversations will appear here when you connect with others who can help find what's lost or return
							what's found.
						</p>
					</div>

					{/* Encouraging Stats */}
					<div className="grid grid-cols-3 gap-4 py-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-slate-700">247</div>
							<div className="text-xs text-slate-500">Active helpers</div>
						</div>
						<div className="text-center border-x border-slate-200">
							<div className="text-2xl font-bold text-green-600">89%</div>
							<div className="text-xs text-slate-500">Success rate</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">24h</div>
							<div className="text-xs text-slate-500">Avg response</div>
						</div>
					</div>

					{/* Bottom Message */}
					<div className="pt-6 border-t border-slate-200">
						<p className="text-xs text-slate-400 italic">"Every message brings hope closer to home"</p>
					</div>
				</div>
			</div>

			<style>{`
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
		</div>
	);
};
