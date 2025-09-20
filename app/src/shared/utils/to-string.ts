export function toStringOrThrow<T>(val: T): string {
	try {
		return String(val);
	} catch (error) {
		console.error("AppRadio Error:", error);
		throw new Error(`Only String can be passed inside a radio button`);
	}
}
