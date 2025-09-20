/* eslint-disable no-restricted-imports */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Users, MapPin, Bell, Shield, Eye, MessageCircle, ArrowRight, Star } from "lucide-react";
import { AppLinkButton } from "@/shared/ui/button/app-button";
import { AppLogo } from "@/shared/ui/app-logo";

export default function LandingUI() {
	const features = [
		{
			icon: <Search className="h-6 w-6" />,
			title: "Smart AI Matching",
			description:
				"Advanced facial recognition and document OCR with semantic text matching to find what matters most.",
		},
		{
			icon: <MapPin className="h-6 w-6" />,
			title: "Location-Aware Search",
			description: "Filter by location and time to narrow down searches and find relevant matches quickly.",
		},
		{
			icon: <Bell className="h-6 w-6" />,
			title: "Real-Time Alerts",
			description: "Get instant notifications when potential matches are found for your missing persons or items.",
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: "Community Threads",
			description: "Collaborate with others through organized threads for specific events, locations, or incidents.",
		},
		{
			icon: <MessageCircle className="h-6 w-6" />,
			title: "Secure Communication",
			description: "Private messaging system to safely coordinate recoveries and confirmations.",
		},
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Trusted Platform",
			description: "Structured, reliable alternative to scattered social media posts with proper follow-up.",
		},
	];

	const stats = [
		{ number: "24/7", label: "Always Available" },
		{ number: "AI-Powered", label: "Smart Matching" },
		{ number: "Community", label: "Driven Platform" },
		{ number: "Free", label: "For Everyone" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Navigation */}
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
				<div className="container mx-auto px-4 flex items-center justify-between">
					<AppLogo className="h-20 w-20" />
					<div className="flex items-center space-x-3">
						<AppLinkButton href="/login" variant="ghost" className="text-slate-700 hover:text-slate-900">
							Login
						</AppLinkButton>
						<AppLinkButton href="/signup" className="bg-slate-900 hover:bg-slate-800 text-white">
							Sign Up
						</AppLinkButton>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-20 pb-16 px-4">
				<div className="container mx-auto text-center">
					<div className="transform transition-all duration-1000">
						<Badge className="mb-6 bg-slate-100 text-slate-700 hover:bg-slate-100 px-4 py-2">
							<Star className="h-4 w-4 mr-2" />
							Because What's Lost Still Matters
						</Badge>

						<h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
							Find What
							<br />
							<span className="relative">
								Matters Most
								<div className="absolute -bottom-2 left-0 right-0 h-1 bg-slate-900 rounded-full transform scale-x-0 animate-pulse"></div>
							</span>
						</h1>

						<p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
							The first AI-powered platform in Bangladesh designed to reunite families with their loved ones and help
							recover lost documents and belongings through intelligent matching and community collaboration.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<AppLinkButton
								href="/login"
								size="lg"
								className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-slate-500/25 transform hover:scale-105 transition-all duration-300"
							>
								Start Searching Now
								<ArrowRight className="ml-2 h-5 w-5" />
							</AppLinkButton>
							<AppLinkButton
								href="#how-it-works"
								size="lg"
								variant="outline"
								className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
							>
								<Eye className="mr-2 h-5 w-5" />
								How It Works
							</AppLinkButton>
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
						{stats.map((stat, index) => (
							<div key={index} className="text-center">
								<div className="text-3xl font-bold text-slate-700 mb-2">{stat.number}</div>
								<div className="text-slate-600">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Problem Statement */}
			<section className="py-16 px-4 bg-white">
				<div className="container mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-6 text-slate-800">A Problem That Touches Every Family</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							Every day in Bangladesh, families face the heartbreak of losing a loved one or important documents.
							Traditional methods leave them helpless and hopeless.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
								<h3 className="font-semibold text-red-800 mb-2">Current Challenges</h3>
								<ul className="space-y-2 text-red-700">
									<li>• Social media posts get buried and can't be searched effectively</li>
									<li>• No automatic matching between lost and found reports</li>
									<li>• Police reports are slow and intimidating for many</li>
									<li>• No real-time alerts or structured follow-up</li>
								</ul>
							</div>
						</div>

						<div className="space-y-6">
							<div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
								<h3 className="font-semibold text-green-800 mb-2">Our Solution</h3>
								<ul className="space-y-2 text-green-700">
									<li>• AI-powered facial recognition and document matching</li>
									<li>• Structured posts with categories and location data</li>
									<li>• Real-time notifications for potential matches</li>
									<li>• Community-driven collaborative threads</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="how-it-works" className="py-16 px-4 bg-slate-50">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6 text-slate-800">Powered by Intelligence, Driven by Hope</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							Our advanced AI technology combined with community collaboration creates the most effective platform for
							finding what's lost.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="group hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm"
							>
								<CardHeader>
									<div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
										{feature.icon}
									</div>
									<CardTitle className="text-xl font-semibold text-slate-800">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-slate-600 leading-relaxed">{feature.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-16 px-4 bg-white">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6 text-slate-800">Simple Steps, Powerful Results</h2>
						<p className="text-xl text-slate-600 max-w-2xl mx-auto">Getting help is just a few clicks away</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								1
							</div>
							<h3 className="text-xl font-semibold mb-4 text-slate-800">Post Details</h3>
							<p className="text-slate-600">
								Upload photos, add descriptions, location, and contact information for what you've lost or found.
							</p>
						</div>

						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								2
							</div>
							<h3 className="text-xl font-semibold mb-4 text-slate-800">AI Matching</h3>
							<p className="text-slate-600">
								Our AI analyzes photos and descriptions to automatically find potential matches from other posts.
							</p>
						</div>

						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								3
							</div>
							<h3 className="text-xl font-semibold mb-4 text-slate-800">Get Connected</h3>
							<p className="text-slate-600">
								Receive instant alerts for matches and connect securely with others to coordinate recovery.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 bg-slate-900">
				<div className="container mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Every Second Counts</h2>
					<p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
						Don't let another moment pass. Join thousands of families who have found hope through Nikhoj.
					</p>

					<div className="flex justify-center">
						<AppLinkButton
							href="/signup"
							size="lg"
							className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
						>
							Create Account for Free
							<ArrowRight className="ml-2 h-5 w-5" />
						</AppLinkButton>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 px-4 bg-slate-950 text-white">
				<div className="container mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center space-x-2 mb-4 md:mb-0">
							<div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
								<Heart className="h-4 w-4 text-white" />
							</div>
							<span className="text-xl font-bold">Nikhoj</span>
						</div>

						<div className="text-center md:text-right">
							<p className="text-slate-400 mb-2">Built with ❤️ by Team No Submission</p>
							<p className="text-slate-400">Shahjalal University of Science and Technology, Sylhet</p>
						</div>
					</div>

					<div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
						<p>© 2025 Nikhoj. Because What's Lost Still Matters.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
