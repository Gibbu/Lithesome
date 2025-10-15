import type { Props } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface AccordionProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value?: string | string[];
	onChange?: (val: string | string[]) => void;
}

//
// ~~ITEM
//
export interface AccordionItemProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value: string;
	disabled?: boolean;
}

//
// ~~HEADING
//
export interface AccordionHeadingProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

//
// ~~BUTTON
//
export interface AccordionButtonProps<A = any, S = any> extends Props<HTMLButtonElement, A, S> {}

//
// ~~CONTENT
//
export interface AccordionContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {}
