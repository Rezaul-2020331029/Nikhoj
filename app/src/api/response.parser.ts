import { ZodError, ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function responseParser<T>(schema: ZodType<T>, response: any): T {
	try {
		console.log("response in responseParser:", response);
		return schema.parse(response.payload);
	} catch (error) {
		console.error("responseParser:", error);
		if (error instanceof ZodError) {
			throw new Error(`Validation failed: ${JSON.stringify(error.message)}`);
		}
		throw error;
	}
}
