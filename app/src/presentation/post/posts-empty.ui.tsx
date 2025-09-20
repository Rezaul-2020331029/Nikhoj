import { Plus, Users, FileText, MapPin, Sparkles, ArrowRight, Heart, Globe, Shield, Search } from "lucide-react";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppCard } from "@/shared/ui/app-card";
import { useNavigate } from "@tanstack/react-router";
import { AppLink } from "@/shared/ui/app-link";

export const PostsEmptyUI = () => {
	const navigate = useNavigate();

	const handleCreatePost = () => {
		navigate({
			to: "/home",
			search: {
				tab: "create",
				date: undefined,
				category: undefined,
				location: undefined,
				threadId: undefined,
				search: undefined,
			},
		});
	};

	const postTypes = [
		{
			title: "Missing Person",
			description: "Help find someone who is lost or missing",
			icon: <Users className="w-6 h-6" />,
			color: "bg-red-50 text-red-600 border-red-200",
			example: "Child, elderly, or family member",
		},
		{
			title: "Lost Document",
			description: "Important papers that need to be returned",
			icon: <FileText className="w-6 h-6" />,
			color: "bg-blue-50 text-blue-600 border-blue-200",
			example: "NID, passport, certificates",
		},
		{
			title: "Lost Item",
			description: "Personal belongings that went missing",
			icon: <MapPin className="w-6 h-6" />,
			color: "bg-green-50 text-green-600 border-green-200",
			example: "Phone, wallet, jewelry, keys",
		},
	];

	const features = [
		{
			icon: <Globe className="w-5 h-5 text-blue-500" />,
			title: "Community-Driven",
			description: "Everyone helps everyone find what's lost",
		},
		{
			icon: <Shield className="w-5 h-5 text-green-500" />,
			title: "Safe & Secure",
			description: "Your privacy and safety are our priority",
		},
		{
			icon: <Heart className="w-5 h-5 text-red-500" />,
			title: "Made with Care",
			description: "Built for real people facing real problems",
		},
	];

	return (
		<div className="h-full bg-gradient-to-br from-slate-50 to-stone-100 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
						<Search className="w-5 h-5 text-white" />
					</div>
					<div>
						<h2 className="font-semibold text-slate-800">Looks Like There is No Posts Yet</h2>
						<p className="text-sm text-slate-500">Start making a difference in your community</p>
					</div>
				</div>
			</div>

			{/* Main Empty State */}
			<div className="flex-1 flex items-center justify-center p-6">
				<div className="text-center space-y-8 max-w-2xl mx-auto">
					{/* Empty State Icon */}
					<div className="relative mx-auto">
						<div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-stone-200 rounded-3xl flex items-center justify-center mb-6 transform rotate-2">
							<div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm">
								<Sparkles className="w-10 h-10 text-slate-600" />
							</div>
						</div>
						<AppLink href={"/create"} className="absolute -top-3 -right-3 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center transform -rotate-12 border-2 border-white shadow-sm">
							<Plus className="w-6 h-6 text-blue-600" />
						</AppLink>
					</div>

					{/* Main Message */}
					<div className="space-y-4">
						<h3 className="text-3xl font-bold text-slate-800">Ready to Help Your Community?</h3>
						<p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
							নিখোঁজ connects people who have lost something important with those who can help find it or return it.
						</p>
						<p className="text-slate-500">
							<span className="font-medium">Every post brings hope closer to home.</span>
						</p>
					</div>

					{/* How It Works */}
					<AppCard className="p-6 bg-white/70 border-slate-200 text-left">
						<h4 className="font-semibold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
							<Heart className="w-5 h-5 text-red-400" />
							How It Works
						</h4>
						<div className="grid md:grid-cols-3 gap-4">
							{features.map((feature, index) => (
								<div key={index} className="text-center space-y-2">
									<div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto">
										{feature.icon}
									</div>
									<h5 className="font-medium text-slate-700 text-sm">{feature.title}</h5>
									<p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
								</div>
							))}
						</div>
					</AppCard>

					{/* Action Buttons */}
					<div className="space-y-4 flex items-center justify-center">
						<AppButton
							onClick={handleCreatePost}
							className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors text-base font-medium"
						>
							<Plus className="w-5 h-5" />
							Create a Post
						</AppButton>
					</div>

					{/* What You Can Report */}
					<div className="space-y-4">
						<div className="flex items-center justify-center gap-2 text-slate-600">
							<Sparkles className="w-4 h-4" />
							<span className="text-sm font-medium">What you can report</span>
						</div>

						<div className="grid gap-3">
							{postTypes.map((type, index) => (
								<AppCard
									key={index}
									className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer group border-slate-200 hover:border-slate-300"
									onClick={handleCreatePost}
								>
									<div className="flex items-center gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center ${type.color} group-hover:scale-105 transition-transform duration-200`}
										>
											{type.icon}
										</div>
										<div className="flex-1 text-left">
											<h4 className="font-semibold text-slate-800 group-hover:text-slate-900">{type.title}</h4>
											<p className="text-sm text-slate-600 group-hover:text-slate-700 mb-1">{type.description}</p>
											<p className="text-xs text-slate-400">Examples: {type.example}</p>
										</div>
										<div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600">
											<span className="text-sm font-medium">Start here</span>
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-200" />
										</div>
									</div>
								</AppCard>
							))}
						</div>
					</div>

					{/* Encouraging Footer */}
					<div className="pt-8 border-t border-slate-200">
						<div className="space-y-3">
							<p className="text-sm text-slate-600">
								Join a community that believes in helping each other find what matters most.
							</p>
							<p className="text-xs text-slate-400 italic">
								"Together, we can turn loss into hope and hope into reunion."
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
