export const log = {
	error(message: string) {
		throw Error(`[Lithesome] ${message}`);
	}
};
