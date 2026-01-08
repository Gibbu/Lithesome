import type { Snippet } from 'svelte';

export interface Props<T extends HTMLElement> {
	children?: Snippet;
	self?: T;
	[key: string]: any;
}

export interface DocsPageMeta {
	title: string;
	description: string;
	path: string;
	order?: number;
	sidebar?: string;
	badge?: 'new' | 'updated' | 'soon';
	hidden?: boolean;
}

export interface DocsGroups {
	name: string;
	items: DocsPageMeta[];
}

export interface ComponentAPIValue {
	name: string;
	type: string;
	comment: string;
	bindable?: true;
	required?: boolean;
}

export interface ComponentReference {
	props: ComponentAPIValue[];
	state: Omit<ComponentAPIValue, 'bindable'>[];
}
