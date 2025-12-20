import type { Props } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface AccordionProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value?: string | string[];
	onChange?: (val: string | string[]) => void;
}

//
// ~~ITEM
//
export interface AccordionItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value: string;
	disabled?: boolean;
}

//
// ~~HEADING
//
export interface AccordionHeadingProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

//
// ~~BUTTON
//
export interface AccordionButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~~CONTENT
//
export interface AccordionContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}
