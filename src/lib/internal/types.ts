import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HTMLActionArray } from './index.js';

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

export type ClassProp<C extends Record<string, any>> = ((props: C) => string) | string | undefined | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & { [P in keyof T]?: T[P] | undefined };

export type HandlerParam<E, T extends HTMLElement> = E & { currentTarget: T };
export type Handler<E, T extends HTMLElement> = (e: HandlerParam<E, T>) => void;

// @ts-ignore
export interface BaseProps<T extends HTMLElement, C extends Record<string, any> = any> extends HTMLAttributes<T> {
	children: Snippet<[C]>;
	use?: HTMLActionArray;
	class?: ClassProp<C>;
	self?: T;
}
