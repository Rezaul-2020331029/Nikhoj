import React, { useState } from "react";
import { MessageCircle, Clock, Bell, Users, Shield, Zap, CheckCircle } from "lucide-react";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppCard } from "@/shared/ui/app-card";
import { AppLogo } from "@/shared/ui/app-logo";
import { AppDialog } from "@/shared/ui/app-dialog";

interface MessagingComingSoonDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const MessagingComingSoonDialog: React.FC<MessagingComingSoonDialogProps> = ({ isOpen, setIsOpen }) => {
	const [notifyMe, setNotifyMe] = useState(false);

	const handleNotifyMe = () => {
		setNotifyMe(true);
		// Here you would typically save the user's preference to be notified
		setTimeout(() => {
			setIsOpen(false);
			setNotifyMe(false); // Reset for next time
		}, 1500);
	};

	const upcomingFeatures = [
		{
			icon: <Shield className="w-5 h-5 text-green-500" />,
			title: "Secure Messaging",
			description: "End-to-end encrypted conversations for your safety",
		},
		{
			icon: <Bell className="w-5 h-5 text-blue-500" />,
			title: "Real-time Notifications",
			description: "Instant alerts when someone responds to your posts",
		},
		{
			icon: <Users className="w-5 h-5 text-purple-500" />,
			title: "Group Coordination",
			description: "Collaborate with multiple people on search efforts",
		},
		{
			icon: <Zap className="w-5 h-5 text-orange-500" />,
			title: "Smart Matching",
			description: "Get notified when your lost items match found posts",
		},
	];

	const dialogContent = (
		<div className="space-y-6 py-2">
			{/* Logo with Animation */}
			<div className="flex justify-center mb-6">
				<div className="w-16 h-16">
					<div className="relative w-full h-full">
						<div className="absolute inset-0 rounded-full bg-slate-200 flex items-center justify-center">
							<AppLogo className="w-10 h-10" />
						</div>
						{/* Gentle pulse */}
						<div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-pulse opacity-30"></div>
					</div>
				</div>
			</div>

			{/* Current Status */}
			<AppCard className="p-4 bg-white/70 border-slate-200">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
						<Clock className="w-4 h-4 text-blue-600" />
					</div>
					<div>
						<h4 className="font-semibold text-slate-700 text-sm">Development Status</h4>
						<p className="text-xs text-slate-500">Currently in active development</p>
					</div>
				</div>
				<div className="w-full bg-slate-200 rounded-full h-2">
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-3/4 relative overflow-hidden">
						<div className="absolute inset-0 bg-white/30 animate-pulse"></div>
					</div>
				</div>
				<p className="text-xs text-slate-500 mt-2 text-center">75% Complete</p>
			</AppCard>

			{/* Upcoming Features */}
			<div className="space-y-3">
				<h4 className="font-semibold text-slate-700 text-sm flex items-center gap-2">
					<MessageCircle className="w-4 h-4" />
					What's Coming
				</h4>
				<div className="grid gap-3">
					{upcomingFeatures.map((feature, index) => (
						<div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-slate-200">
							<div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
								{feature.icon}
							</div>
							<div>
								<h5 className="font-medium text-slate-700 text-sm">{feature.title}</h5>
								<p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Alternative Contact Method */}
			<AppCard className="p-4 bg-orange-50/50 border-orange-200">
				<div className="flex items-start gap-3">
					<div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
						<span className="text-orange-600 text-xs font-bold">!</span>
					</div>
					<div className="text-left">
						<h4 className="font-medium text-orange-800 text-sm mb-1">Need to contact someone now?</h4>
						<p className="text-xs text-orange-700 leading-relaxed">
							You can use the contact information provided in the post to reach out directly via phone or other means
							mentioned by the poster.
						</p>
					</div>
				</div>
			</AppCard>

			{/* Footer Message */}
			<div className="text-center pt-2 border-t border-slate-200">
				<p className="text-xs text-slate-400 italic">"Great things take time, but they're worth the wait"</p>
			</div>
		</div>
	);

	const dialogFooter = (
		<>
			{!notifyMe ?
				<AppButton
					onClick={handleNotifyMe}
					className="bg-slate-700 hover:bg-slate-800 text-white rounded-lg flex items-center gap-2 transition-colors"
				>
					<Bell className="w-4 h-4" />
					Notify Me
				</AppButton>
			:	<div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
					<CheckCircle className="w-4 h-4 text-green-600" />
					<span className="text-sm font-medium text-green-700">We'll notify you when it's ready!</span>
				</div>
			}
		</>
	);

	return (
		<AppDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title="Messaging Coming Soon!"
			description="We're building a secure messaging system to help you connect safely with others in the community."
			openDialog={<></>} // Not used since we control the dialog state externally
			closeDialog={
				<AppButton variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
					Got It
				</AppButton>
			}
			dialogContent={dialogContent}
			dialogFooter={dialogFooter}
		/>
	);
};

// Example usage component to show how it would be implemented
const MessagingComingSoonExample = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<div className="p-8 bg-slate-100 min-h-screen flex items-center justify-center">
			<div className="space-y-4 text-center">
				<h2 className="text-2xl font-bold text-slate-800">Dialog Demo</h2>
				<p className="text-slate-600">Click the AppButton to see the messaging coming soon dialog</p>
				<AppButton onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
					<MessageCircle className="w-4 h-4" />
					Message
				</AppButton>
			</div>

			<MessagingComingSoonDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</div>
	);
};

export default MessagingComingSoonExample;
