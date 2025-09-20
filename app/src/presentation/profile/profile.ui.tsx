import { useGetProfile } from "@/hooks/use-auth.hook";

export function ProfileUI() {
	const { data, isLoading, error } = useGetProfile();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">Failed to load profile</div>;
	if (!data) return <div>No data available</div>;

	return (
		<article className="border rounded-md bg-accent p-4">
			<h1 className="font-semibold text-2xl">{data.name}</h1>
			<p className="text-accent-foreground">{data.email}</p>
		</article>
	);
}
