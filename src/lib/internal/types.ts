import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HTMLActionArray } from './index.js';

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

export type ClassProp<C extends Record<string, any>> = ((props: C) => string) | string | undefined | null;

// @ts-ignore
export interface BaseProps<T extends HTMLElement, C extends Record<string, any> = any> extends HTMLAttributes<T> {
	children: Snippet<[C]>;
	use?: HTMLActionArray;
	class?: ClassProp<C>;
}
