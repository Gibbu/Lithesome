import type { OffsetOptions } from '@floating-ui/core';
import type { FlipOptions, Placement, ShiftOptions } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export type CSSStyleObject = {
	[K in keyof CSSStyleDeclaration]?: string | number;
};

type StyleValue = string | CSSStyleObject;

export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = undefined | null | boolean | number | string | JsonValue[] | JsonObject;
export type StateValues<T extends Record<string, any>> = { [K in keyof T]: { val: T[K] } };
export type StateValue<T> = { val: T };
export type Orientation = 'horizontal' | 'vertical';
export type ClassProp<S> = ((state: S) => ClassValue) | ClassValue;
export type StyleProp<S> = ((state: S) => StyleValue) | StyleValue;
export type PortalTarget = HTMLElement | string;

export type RemoveFunctionProps<T> = {
	[K in keyof T as Exclude<T[K], undefined> extends (...args: any[]) => unknown ? never : K]: T[K];
};

export type GetInternalProps<T extends Record<string, any>> = StateValues<
	Required<RemoveFunctionProps<Omit<T, 'class' | 'ref' | 'id' | 'style'>>>
> & { id: string };
export type GetInternalPropsNoId<T extends Record<string, any>> = StateValues<
	Required<RemoveFunctionProps<Omit<T, 'class' | 'ref' | 'id' | 'style'>>>
>;

export type Class<T> = new (...args: any[]) => T;

export interface FloatingConfig {
	/**
	 * The placement of the content.
	 *
	 * @default 'top'
	 */
	placement?: Placement;

	/**
	 * The `flip` middleware from `@floating-ui/dom`.
	 */
	flip?: FlipOptions;

	/**
	 * The `shift` middleware from `@floating-ui/dom`.
	 *
	 * @default {padding: 10}
	 */
	shift?: ShiftOptions;

	/**
	 * The `offset` middleware from `@floating-ui/dom`.
	 *
	 * @default 0
	 */
	offset?: OffsetOptions;

	/**
	 * Sets the content width to be the same width as the trigger.
	 *
	 * @default false
	 */
	sameWidth?: boolean;
}

/** Used for when render a self-closing element, such as an input. */
export interface PropsNoCildren<E extends HTMLElement, S> {
	class?: ClassProp<S>;
	style?: StyleProp<S>;
	ref?: E;
	id?: string;
}

/** Default, used for when a component renders an element with children */
export interface Props<E extends HTMLElement, A, S> extends PropsNoCildren<E, S> {
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	custom?: Snippet<[S extends Record<string, any> ? { attrs: A; state: S } : { attrs: A }]>;
}

/** Used if the element does render children, but does not allow for the custom snippet. */
export type PropsNoCustom<E extends HTMLElement, A, S> = Omit<Props<E, A, S>, 'custom'>;

/** Used if the element does render children, but does not wrap said children in an element. */
export interface PropsNoRender<S> {
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	id?: string;
}
