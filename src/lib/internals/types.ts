import type { OffsetOptions } from '@floating-ui/core';
import type { FlipOptions, Placement, ShiftOptions } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

type StyleValue = string | CSSStyleObject;
type OmitProps = 'children' | 'custom' | 'class' | 'style' | 'id';

export type CSSStyleObject = {
	[K in keyof CSSStyleDeclaration]?: string | number;
};

export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = undefined | null | boolean | number | string | JsonValue[] | JsonObject;
export type StateValues<T> = {
	[K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: { val: T[K] };
} & {
	[K in keyof T as T[K] extends (...args: any[]) => any ? K : never]?: T[K];
};
// export type StateValues<T extends Record<string, any>> = { [K in keyof T]: { val: T[K] } };
export type StateValue<T> = { val: T };
export type Orientation = 'horizontal' | 'vertical';
export type ClassProp<S> = ((state: S) => ClassValue) | ClassValue;
export type StyleProp<S> = ((state: S) => StyleValue) | StyleValue;
export type PortalTarget = HTMLElement | string;

export type GetInternalProps<T extends Record<string, any>> = StateValues<
	Required<Omit<T, OmitProps> & { id: string }>
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
export interface PropsNoChildren<E extends HTMLElement, S> {
	class?: ClassProp<S>;
	style?: StyleProp<S>;
	ref?: E;
	id?: string;
}

/** Default, used for when a component renders an element with children */
export interface Props<E extends HTMLElement, P, S> extends PropsNoChildren<E, S> {
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	custom?: Snippet<[S extends Record<string, any> ? { props: P; state: S } : { props: P }]>;
}

/** Used if the element does render children, but does not allow for the custom snippet. */
export type PropsNoCustom<E extends HTMLElement, P, S> = Omit<Props<E, P, S>, 'custom'>;

/** Used if the element does render children, but does not wrap said children in an element. */
export interface PropsNoRender<S> {
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	id?: string;
}
