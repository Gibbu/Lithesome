export interface Prop {
	name: string;
	type: string;
	default: string;
	description?: string;
	required?: boolean;
}
export interface Event {
	name: string;
	return: string;
	params: string[];
	description?: string;
}
export interface DataAttrs {
	name: string;
	value?: string;
	description?: string;
}
export interface ChildrenProps {
	name: string;
	type: string;
	description?: string;
}

export interface ComponentReference {
	name: string;
	description?: string;
	childOf?: string;
	props?: Prop[];
	events?: Event[];
	dataAttrs?: DataAttrs[];
	childrenProps?: ChildrenProps[];
	function?: boolean;
}

export interface DocsPageMeta {
	title: string;
	description: string;
	path: string;
	order: number;
	sidebar?: string;
	badge?: 'new' | 'updated' | 'soon';
	hidden?: boolean;
}

export interface ActionProps {
	name: string;
	type: string;
	description: string;
	required?: boolean;
	default?: string;
}
export type ActionReference = ActionProps[];
