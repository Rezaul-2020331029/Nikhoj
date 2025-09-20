declare global {
	interface Date {
		toUrlParam(): string;
	}
}

Date.prototype.toUrlParam = function (): string {
	const y = this.getFullYear();
	const m = (this.getMonth() + 1).toString().padStart(2, "0");
	const d = this.getDate().toString().padStart(2, "0");
	return `${y}-${m}-${d}`; // "2025-09-14"
};

export {};
