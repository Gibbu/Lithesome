import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HTMLActionArray } from './index.js';

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

export type ClassProp<C extends Record<string, any>> = ((props: C) => string) | string | undefined | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & { [P in keyof T]?: T[P] | undefined };

export type HandlerParam<E, T extends HTMLElement> = E & { currentTarget: EventTarget & T };
export type Handler<E, T extends HTMLElement> = (e: HandlerParam<E, T>) => void;

// @ts-ignore
export interface BaseProps<T extends HTMLElement, C extends Record<string, any> = any> extends HTMLAttributes<T> {
	children: Snippet<[C]>;
	/**
	 * Any svelte actions you wish to pass to the underlying HTML element.
	 *
	 * @see https://lithesome.dev/docs/api#use-prop
	 */
	use?: HTMLActionArray;
	/**
	 * And classes to be set on the underlying HTML element.
	 * A function can be used to expose the component states, if any are present.
	 *
	 * @see https://lithesome.dev/docs/styling#class-prop-function
	 */
	class?: ClassProp<C>;
	/**
	 * Alias for `bind:this`, allowing for the binding of the element.
	 */
	self?: T;
}
