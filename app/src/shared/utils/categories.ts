// The value for each spec in the new map structure
type SpecValue =
	| {
			inputType: "text" | "number";
			options?: never;
	  }
	| {
			inputType: "select";
			options: string[];
	  };

// The Category type with specs as a Record (map)
export type Category = {
	name: string;
	specs: Record<string, SpecValue>;
};

export type Categories = Category[];

export const categories: Categories = [
	{
		name: "Human",
		specs: {
			Gender: {
				inputType: "select",
				options: ["Male", "Female", "Other"],
			},
			Height: { inputType: "number" },
			Age: { inputType: "number" },
			Name: { inputType: "text" },
			"Skin Tone": {
				inputType: "select",
				options: ["Fair", "Medium", "Olive", "Brown", "Dark"],
			},
		},
	},
	{
		name: "NiD",
		specs: {
			"NiD Number": { inputType: "text" },
		},
	},
	{
		name: "Passport",
		specs: {
			"Passport Number": { inputType: "text" },
		},
	},
	{
		name: "Document",
		specs: {
			Type: { inputType: "text" },
			"Unique ID Number": { inputType: "text" },
		},
	},

	{
		name: "Others",
		specs: {},
	},
];
