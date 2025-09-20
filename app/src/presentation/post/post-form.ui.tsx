import { AppForm } from "@/shared/layout/app-form.layout";
import { categories } from "@/shared/utils/categories";
import { CreatePostRequestSchema } from "@/domain/post/post.schema";
import type { z } from "zod";
import { useCreatePost } from "@/hooks/use-post.hook";
import { useGetAllThread } from "@/hooks/use-thread.hook";
import { districts } from "@/shared/utils/districts";

type CreatePostFormValues = z.infer<typeof CreatePostRequestSchema>;

export function PostFormUI() {
	const { mutateAsync } = useCreatePost();
	const { data: threads } = useGetAllThread();

	// Helper function to generate specs object
	const getSpecsObject = (categoryName: string) => {
		const specs = categories.find((c) => c.name === categoryName)?.specs || {};
		return Object.entries(specs).reduce((acc: Record<string, string | number>, [name, spec]) => {
			acc[name] =
				spec.inputType === "select" ? spec.options[0]
				: spec.inputType === "number" ? 0
				: "";
			return acc;
		}, {});
	};

	const defaultValues: CreatePostFormValues = {
		title: "",
		description: "",
		category: "Human",
		postType: "lost",
		threadId: "1",
		files: [],
		postSpecs: getSpecsObject("Human"),
		contactNumber: "",
		district: districts[0].name,
		city: "",
		subDistrict: "",
		postOffice: "",
		roadAddress: "",
	};

	return (
		<AppForm
			defaultValues={defaultValues}
			schema={CreatePostRequestSchema}
			onSubmit={async (values) => {
				await mutateAsync(values);
			}}
			layoutProps={{
				className: "w-full col-span-2 max-w-full",
			}}
			formProps={{
				className: "md:grid md:grid-cols-2 gap-12",
			}}
		>
			{(Form) => {
				return (
					<>
						<div className="flex flex-col gap-4">
							{/* Files */}
							<Form.AppField name="files">
								{(field) => <field.ImageInput label="Image" description="Upload post image" />}
							</Form.AppField>

							{/* Basic Fields */}
							<Form.AppField name="title">
								{(field) => <field.TextInput label="Title" description="Enter post title" />}
							</Form.AppField>

							<Form.AppField name="contactNumber">
								{(field) => <field.TextInput label="Contact No" description="Enter phone number" />}
							</Form.AppField>

							<Form.AppField name="description">
								{(field) => <field.TextareaInput label="Description" description="Select post description" />}
							</Form.AppField>

							{/* Post Type */}
							<Form.AppField name="postType">
								{(field) => (
									<field.RadioInput
										name="postType"
										label="Post Type"
										radioButtons={["lost", "found"]}
										description="Select post type"
									/>
								)}
							</Form.AppField>
						</div>

						<div className="flex flex-col gap-4">
							{/* Category */}
							<Form.AppField
								name="category"
								listeners={{
									onChange: ({ value }) => {
										// Get current postSpecs to clear errors for old fields
										const currentPostSpecs = Form.getFieldValue("postSpecs");

										// Clear errors for all current postSpec fields
										if (currentPostSpecs) {
											Object.keys(currentPostSpecs).forEach((specKey) => {
												const fieldName = `postSpecs.${specKey}` as `postSpecs.${string}`;
												Form.resetField(fieldName);
											});
										}
										Form.setFieldValue("postSpecs", getSpecsObject(value));
									},
								}}
							>
								{(field) => {
									return (
										<field.SelectInput
											name="category"
											label="Category"
											options={categories.map((c) => c.name)}
											description="Select post category"
										/>
									);
								}}
							</Form.AppField>
							{/* Dynamic Specs */}
							<Form.Subscribe
								selector={(state) => state.values.category}
								children={(categoryName) => {
									const category = categories.find((c) => c.name === categoryName);
									if (!category) return null;

									return (
										<div className="flex flex-col gap-3 border p-3 rounded">
											{Object.entries(category.specs).map(([name, spec]) => (
												<Form.AppField key={name} name={`postSpecs.${name}`}>
													{(field) => {
														if (spec.inputType === "select") {
															return (
																<field.SelectInput
																	name={name}
																	label={name}
																	options={spec.options!}
																	description={`Select ${name}`}
																/>
															);
														} else {
															return (
																<field.TextInput type={spec.inputType} label={name} description={`Enter ${name}`} />
															);
														}
													}}
												</Form.AppField>
											))}
										</div>
									);
								}}
							/>

							{/* Thread */}
							<Form.AppField name="threadId">
								{(field) => {
									return (
										<field.SelectInput
											name="threadId"
											label="Thread"
											optionsWithKey={threads.map((t) => ({
												key: t.id,
												value: (
													<div>
														<p>{t.title}</p>
														<p className="text-muted-foreground">Location: {t.location}</p>
													</div>
												),
											}))}
											description="Select post thread"
										/>
									);
								}}
							</Form.AppField>

							{/* Location Fields */}
							<div className="flex justify-between gap-2">
								<Form.AppField name="district">
									{(field) => (
										<field.SelectInput
											name="district"
											label="District"
											description="Enter district"
											className="flex-1"
											options={districts.map((d) => d.name)}
										/>
									)}
								</Form.AppField>
								<Form.AppField name="subDistrict">
									{(field) => <field.TextInput label="Sub-district" description="Enter sub-district" />}
								</Form.AppField>
							</div>

							<div className="flex justify-between gap-2">
								<Form.AppField name="city">
									{(field) => <field.TextInput label="City" description="Enter city" />}
								</Form.AppField>
								<Form.AppField name="postOffice">
									{(field) => <field.TextInput label="Post Office" description="Enter post office" />}
								</Form.AppField>
							</div>

							<Form.AppField name="roadAddress">
								{(field) => <field.TextInput label="Road Address" description="Enter road address" />}
							</Form.AppField>

							<Form.AppForm>
								<Form.SubmitButton label="Create Post" className="col-span-2" />
							</Form.AppForm>
						</div>
					</>
				);
			}}
		</AppForm>
	);
}
