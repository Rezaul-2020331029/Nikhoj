import { Search, Eye } from "lucide-react";

export const PostsSearchEmptyUI = () => {
	return (
		<div className="h-full bg-gradient-to-br from-slate-50 to-stone-100 flex flex-col">
			{/* Main Empty State */}
			<div className="flex-1 flex items-center justify-center p-6">
				<div className="text-center space-y-8 max-w-lg mx-auto">
					{/* Central Icon */}
					<div className="relative mx-auto">
						<div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
							<Search className="w-12 h-12 text-slate-400" />
						</div>
						<div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transform -rotate-12">
							<Eye className="w-4 h-4 text-orange-500" />
						</div>
					</div>

					{/* Main Message */}
					<div className="space-y-3">
						<h3 className="text-2xl font-semibold text-slate-800">No Posts Found</h3>
						<p className="text-slate-600 leading-relaxed">
							We couldn't find any posts matching your search. This could mean what you're looking for hasn't been
							reported yet, or it might already be resolved!
						</p>
					</div>

					{/* Bottom Message */}
					<div className="pt-6 border-t border-slate-200">
						<p className="text-xs text-slate-400 italic">
							"Sometimes not finding something means it's already been found"
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
