import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HTMLActionArray, Transition } from './index.js';
import type { Placement } from '@floating-ui/dom';

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
}

export type BasePropsNoChildren<T extends HTMLElement, C extends Record<string, any> = any> = Omit<
	BaseProps<T, C>,
	'children'
>;

export interface DropdownProps {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
	/** The element to portal the dropdown menu to. */
	portalTarget?: string | HTMLElement;
	/** The anchor point of the dropdown relative to the trigger. */
	placement?: Placement;
	/** Keeps the dropdown from ever growing outside of the viewport. */
	constrainViewport?: boolean;
	/** Makes the dropdown the same width as the trigger. */
	sameWidth?: boolean;
}
