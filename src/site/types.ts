export interface Prop {
	name: string;
	kind: string;
	type?: string;
	isFunction: boolean;
	isFunctionDeclaration: boolean;
	isRequired: boolean;
	constant: boolean;
	reactive: boolean;
	description: string;
	value?: string;
}

export interface Slot {
	name: string;
	default: boolean;
	fallback: string;
	slot_props: string;
	description?: string;
}

export interface Event {
	type: string;
	name: string;
	element: string;
	description?: string;
}

export interface RestProps {
	type: string;
	name: string;
}

export interface Typedefs {
	type: string;
	name: string;
	ts: string;
}

export interface ModuleExport {
	name: string;
	kind: string;
	type?: string;
	value: string;
	isFunction: boolean;
	isFunctionDeclaration: boolean;
	isRequired: boolean;
	constant: boolean;
	reactive: boolean;
}

export interface Component {
	props: Prop[];
	slots: Slot[];
	events: Event[];
	typedefs: Typedefs[];
	rest_props: RestProps[];
	moduleExports: ModuleExport[];
	componentComment?: string;
	extends?: {
		interface: string;
		import: string;
	};
}

export interface DocsPageMeta {
	order: number;
	title: string;
	path: string;
	sidebar?: string;
	badge?: 'new' | 'updated' | 'soon';
}
