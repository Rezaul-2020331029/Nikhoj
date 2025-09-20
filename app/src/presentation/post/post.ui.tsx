import { useGetProfile } from "@/hooks/use-auth.hook";
import type { PostViewModel } from "@/services/post/post.viewmodel";
import { AppImage } from "@/shared/ui/app-image";
import { AppButton } from "@/shared/ui/button/app-button";
import React, { use, useState } from "react";
import { createContext } from "react";
import { ChevronDown, ChevronUp, MapPin, Phone, Tag, FileText, User } from "lucide-react";
import { AppDialog } from "@/shared/ui/app-dialog";
import { getSimilarPosts } from "@/queries/post.query";
import { useDeletePost } from "@/hooks/use-post.hook";
import { cn } from "@/lib/utils";
import { usePostStore } from "@/store/use-post.store";

const PostContext = createContext<PostViewModel | null>(null);

function usePostContext() {
	const context = use(PostContext);

	if (!context) {
		throw new Error("<Post.* /> must be used inside a PostContext");
	}

	return context;
}

type PostProps = {
	Post: PostViewModel;
	Image?: React.ReactNode;
	Title?: React.ReactNode;
	Type?: React.ReactNode;
	Category?: React.ReactNode;
	Contact?: React.ReactNode;
	Address?: React.ReactNode;
	CategorySpecs?: React.ReactNode;
	Description?: React.ReactNode;
	Footer?: React.ReactNode;
	shouldShowDetails?: boolean;
} & React.HtmlHTMLAttributes<HTMLElement>;

function Post({
	Post,
	Image,
	Title,
	Type,
	Category,
	Contact,
	Address,
	CategorySpecs,
	Description,
	Footer,
	shouldShowDetails,
	...inputProps
}: PostProps) {
	const [showDetails, setShowDetails] = useState(shouldShowDetails);
	const { className, ...otherProps } = { ...inputProps };
	return (
		<PostContext value={Post}>
			<article
				className={cn(
					"group bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer",
					className
				)}
				{...otherProps}
			>
				<div
					onClick={() => {
						setShowDetails((prev) => !prev);
					}}
					className="relative"
				>
					{Image}

					<div className="p-5 space-y-4">
						{/* Header Section */}
						<div className="space-y-3">
							{Title}
							<div className="flex flex-wrap gap-2">
								{Type}
								{Category}
							</div>
						</div>

						{/* Contact & Address Section */}
						<div className="space-y-2 pb-3 border-b border-slate-100">
							{Contact}
							{Address}
						</div>

						{/* Expandable Details */}
						{showDetails && (
							<div className="space-y-4 pt-2 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
								{CategorySpecs}
								{Description}
							</div>
						)}

						{/* Expand/Collapse Indicator */}
						<div className="flex justify-center pt-2">
							<div className="flex items-center text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
								{showDetails ?
									<>
										<span>Show less</span>
										<ChevronUp className="w-4 h-4 ml-1" />
									</>
								:	<>
										<span>Show more</span>
										<ChevronDown className="w-4 h-4 ml-1" />
									</>
								}
							</div>
						</div>
					</div>
				</div>

				{Footer}
			</article>
		</PostContext>
	);
}

function Image() {
	const { imageUrls, title } = usePostContext();
	return (
		<div className="relative overflow-hidden bg-slate-50">
			<AppImage
				url={imageUrls?.[0]?.url}
				alt={title}
				className="w-full object-contain group-hover:scale-105 transition-transform duration-500"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
		</div>
	);
}

function Title() {
	const { title } = usePostContext();
	return (
		<h2 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-slate-700 transition-colors">
			{title}
		</h2>
	);
}

function Type() {
	const { postType } = usePostContext();
	const isFound = postType.toLowerCase() === "found";
	const chipClass =
		isFound ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200";

	return (
		<div
			className={cn(
				"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
				chipClass
			)}
		>
			<FileText className="w-3 h-3" />
			{postType}
		</div>
	);
}

function Category() {
	const { category } = usePostContext();
	return (
		<div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
			<Tag className="w-3 h-3" />
			{category}
		</div>
	);
}

function Contact() {
	const { contactNumber } = usePostContext();
	return (
		<div className="flex items-center gap-2 text-sm text-slate-600">
			<Phone className="w-4 h-4 text-slate-500" />
			<span className="font-medium text-slate-700">Contact:</span>
			<span className="font-mono">{contactNumber}</span>
		</div>
	);
}

function Address() {
	const { address } = usePostContext();
	return (
		<div className="flex items-start gap-2 text-sm text-slate-600">
			<MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
			<div>
				<span className="font-medium text-slate-700">Address:</span>
				<span className="ml-1">{address}</span>
			</div>
		</div>
	);
}

function CategorySpecs() {
	const { specs } = usePostContext();
	return (
		<div className="space-y-2">
			<h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
				<User className="w-4 h-4" />
				Details
			</h4>
			<ul className="space-y-1.5 pl-5">
				{specs.map(({ id, name, value }) => (
					<li key={id} className="flex gap-2 text-sm">
						<span className="font-medium text-slate-600 min-w-0">{name}:</span>
						<span className="text-slate-700 break-words">{value}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function Description() {
	const { description } = usePostContext();
	return (
		<div className="space-y-2">
			<h4 className="text-sm font-semibold text-slate-700">Description</h4>
			<p className="text-sm text-slate-600 leading-relaxed">{description}</p>
		</div>
	);
}

function Footer() {
	const { mutateAsync, isPending } = useDeletePost();
	const { setPost } = usePostStore();
	const post = usePostContext();
	const { data: user } = useGetProfile();

	const [isOpen, setIsOpen] = useState(false);

	const isCreator = post.posterId === user.id;

	const leftContent = isCreator ? "Resolve" : "Report";
	const rightContent = isCreator ? "Similar" : "Message";

	return (
		<div className="flex border-t border-slate-200 bg-slate-50/50">
			{isCreator ?
				<AppButton
					onClick={(e) => {
						e.stopPropagation();
						mutateAsync({ postId: post.id });
					}}
					variant="destructive"
					className="flex-1 rounded-none border-0 bg-transparent hover:bg-red-50 text-red-600 font-medium py-3"
					disabled={isPending}
				>
					{leftContent}
				</AppButton>
			:	<AppDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title="Coming Soon"
					dialogContent={
						<p>
							Soon you’ll be able to flag posts that need attention, helping keep our community safe and trustworthy for
							everyone
						</p>
					}
					openDialog={
						<AppButton
							onClick={(e) => {
								e.stopPropagation();
							}}
							variant="destructive"
							className="flex-1 rounded-none border-0 bg-transparent hover:bg-red-50 text-red-600 font-medium py-3"
						>
							{leftContent}
						</AppButton>
					}
					closeDialog={<AppButton>Okay</AppButton>}
				/>
			}

			<div className="w-px bg-slate-200"></div>
			{isCreator ?
				<AppButton
					onClick={async (e) => {
						e.stopPropagation();
						getSimilarPosts({ postId: post.id });
						setPost(post);
						window.open(`/similarity/${post.id}`, "_blank", "noopener,noreferrer");
					}}
					className="flex-1 rounded-none border-0 bg-transparent hover:bg-blue-50 text-blue-600 font-medium py-3"
				>
					{rightContent}
				</AppButton>
			:	<AppDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title="Coming Soon"
					dialogContent={
						<p>
							Soon you'll be able to connect directly with community members who can help reunite what's lost with those
							who love them most.
						</p>
					}
					openDialog={
						<AppButton
							onClick={(e) => {
								e.stopPropagation();
							}}
							className="flex-1 rounded-none border-0 bg-transparent hover:bg-blue-50 text-blue-600 font-medium py-3"
						>
							{rightContent}
						</AppButton>
					}
					closeDialog={<AppButton>Okay</AppButton>}
				/>
			}
		</div>
	);
}

Post.Image = Image;
Post.Title = Title;
Post.Type = Type;
Post.Category = Category;
Post.Contact = Contact;
Post.Address = Address;
Post.CategorySpecs = CategorySpecs;
Post.Description = Description;
Post.Footer = Footer;

export { Post };
