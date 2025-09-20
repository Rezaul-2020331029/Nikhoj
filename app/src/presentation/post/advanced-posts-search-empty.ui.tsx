import { Search, Filter, Sliders, Users, FileText, Tag, Zap } from "lucide-react";
import { AppCard } from "@/shared/ui/app-card";

export const AdvancedSearchPostsEmptyUI = () => {
	return (
		<div className="h-full bg-gradient-to-br from-slate-50 to-stone-100 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<Sliders className="w-5 h-5 text-white" />
					</div>
					<div>
						<h2 className="font-semibold text-slate-800">Advanced Search</h2>
						<p className="text-sm text-slate-500">Use powerful filters to find exactly what you're looking for</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center p-6">
				<div className="text-center space-y-8 max-w-2xl mx-auto">
					{/* Central Icon */}
					<div className="relative mx-auto">
						<div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 transform -rotate-2">
							<div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
								<Search className="w-8 h-8 text-slate-600" />
							</div>
						</div>
						<div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform rotate-12 shadow-sm">
							<Filter className="w-5 h-5 text-white" />
						</div>
						<div className="absolute -bottom-2 -left-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transform -rotate-12 border-2 border-white">
							<Zap className="w-4 h-4 text-orange-500" />
						</div>
					</div>

					{/* Main Message */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-slate-800">Ready to Search Smarter?</h3>
						<p className="text-lg text-slate-600 leading-relaxed">
							Use the advanced search form to find posts with precision. Set your filters and let our intelligent search
							do the work.
						</p>
					</div>

					{/* Instructions */}
					<AppCard className="p-4 bg-blue-50/50 border-blue-200">
						<div className="flex items-start gap-3">
							<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<span className="text-blue-600 text-xs font-bold">i</span>
							</div>
							<div className="text-left">
								<h4 className="font-medium text-blue-800 text-sm mb-1">How to get started</h4>
								<p className="text-xs text-blue-600 leading-relaxed">
									Fill out the search form on the left with your criteria. You can search by location, time range,
									category, and even use natural language descriptions. Hit search and we'll show you the most relevant
									posts.
								</p>
							</div>
						</div>
					</AppCard>

					{/* Categories Quick Reference */}
					<div className="flex justify-center gap-6 pt-4">
						<div className="text-center">
							<div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-2">
								<Users className="w-5 h-5 text-red-500" />
							</div>
							<span className="text-xs text-slate-500">People</span>
						</div>
						<div className="text-center">
							<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
								<FileText className="w-5 h-5 text-blue-500" />
							</div>
							<span className="text-xs text-slate-500">Documents</span>
						</div>
						<div className="text-center">
							<div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-2">
								<Tag className="w-5 h-5 text-green-500" />
							</div>
							<span className="text-xs text-slate-500">Items</span>
						</div>
					</div>

					{/* Footer Message */}
					<div className="pt-6 border-t border-slate-200">
						<p className="text-xs text-slate-400 italic">"The more specific your search, the better your results"</p>
					</div>
				</div>
			</div>
		</div>
	);
};
