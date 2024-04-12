export const log = {
	error(message: string) {
		throw new Error(`[Lithesome] ${message}`);
	}
};
