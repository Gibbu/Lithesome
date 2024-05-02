export const log = {
	error(message: string) {
		return new Error(`[Lithesome] ${message}`);
	}
};
