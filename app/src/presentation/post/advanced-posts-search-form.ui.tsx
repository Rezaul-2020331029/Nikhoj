import { AppForm } from "@/shared/layout/app-form.layout";
import { categories } from "@/shared/utils/categories";
import { AdvancedSearchPostRequestSchema } from "@/domain/post/post.schema";
import type { z } from "zod";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { PaginatedPostsViewModel } from "@/services/post/post.viewmodel";

type AdvancedSearchFormValues = z.infer<typeof AdvancedSearchPostRequestSchema>;

type AdvancedPostsSearchFormUIProps = {
	mutateAsync: UseMutateAsyncFunction<PaginatedPostsViewModel, unknown, AdvancedSearchFormValues, unknown>;
};

export function AdvancedPostsSearchFormUI({ mutateAsync }: AdvancedPostsSearchFormUIProps) {
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

	const defaultValues: AdvancedSearchFormValues = {
		category: "Human",
		postType: "lost",
		postSpecs: getSpecsObject("Human"),
		page: 0,
		size: 10,
	};

	return (
		<AppForm
			defaultValues={defaultValues}
			schema={AdvancedSearchPostRequestSchema}
			onSubmit={async (values) => {
				await mutateAsync(values);
			}}
		>
			{(Form) => {
				return (
					<>
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
														return <field.TextInput type={spec.inputType} label={name} description={`Enter ${name}`} />;
													}
												}}
											</Form.AppField>
										))}
									</div>
								);
							}}
						/>

						{/* Submit */}
						<Form.AppForm>
							<Form.SubmitButton label="Find Posts" />
						</Form.AppForm>
					</>
				);
			}}
		</AppForm>
	);
}
