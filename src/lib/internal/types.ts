import type { Snippet } from 'svelte';
import type { HTMLActionArray, Transition } from './index.js';
import type { Placement } from '@floating-ui/dom';

export type Orientation = 'horizontal' | 'vertical';

export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = undefined | null | boolean | number | string | JsonValue[] | JsonObject;

export type ClassProp<C extends Record<string, any>> = ((props: C) => string) | string | undefined | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & { [P in keyof T]?: T[P] | undefined };

export type HandlerParam<E, T extends HTMLElement> = E & { currentTarget: EventTarget & T };
export type Handler<E, T extends HTMLElement> = (e: HandlerParam<E, T>) => void;

export type Class<T> = new (...args: any[]) => T;

export interface PropsNoElement<C extends Record<string, any>> {
	children?: Snippet<[C]>;
}

export interface PropsNoChildren<T extends HTMLElement, C extends Record<string, any> = any> {
	/**
	 * Any svelte actions you wish to pass to the underlying HTML element.
	 *
	 * @see https://lithesome.dev/docs/api#use-prop
	 */
	use?: HTMLActionArray;
	/**
	 * Any classes to be set on the underlying HTML element.
	 * A function can be used to expose the component states, if any are present.
	 *
	 * @see https://lithesome.dev/docs/styling#class-prop-function
	 */
	class?: ClassProp<C>;
	/**
	 * Alias for `bind:this`, allowing for the binding of the element.
	 */
	self?: T;
	[key: string]: any;
}

export interface Props<T extends HTMLElement, C extends Record<string, any> = any> extends PropsNoChildren<T, C> {
	children?: Snippet<[C]>;
}

export interface ContentProps {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
	/** The element to portal the content menu to. */
	portalTarget?: string | HTMLElement;
	/** The anchor point of the content relative to the trigger. */
	placement?: Placement;
	/** Keeps the content from ever growing outside of the viewport. */
	constrainViewport?: boolean;
	/** Makes the content the same width as the trigger. */
	sameWidth?: boolean;
	/** The number in `px` to offset from the content. */
	offset?: number;
}

export type StateValues<T extends Record<string, any>> = { [K in keyof T]: { val: T[K] } };
export type StateValue<T> = { val: T };
