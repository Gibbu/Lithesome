export interface Item {
	href: string;
	data: Record<string, any>;
}
export interface Group {
	name: string;
	items: Item[];
}
