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
	/**
	 * Any CSS classes to be applied to the underlying element.
	 *
	 * Lithesome components can also recieve a function that returns a `ClassValue`.\
	 * With this function, we can destructure the first parameter to use the state of that component.
	 *
	 * @example
	 * ```svelte
	 * <SelectOption value="1" class={({ hovered }) => [
	 * 	'hovered' && 'bg-red-500',
	 * ]}>
	 * 	Item 1
	 * </SelectOption>
	 * ```
	 * With this any select option that is currently being hovered will have a red background.
	 */
	class?: ClassProp<S>;
	/**
	 * Any styles to be applied to the underlying element.
	 *
	 * Some Lithesome components (such as `<SelectContent />`) will already have styles applied to them,\
	 * Lithesome will take the internal styles over the ones provided so components work correctly.
	 *
	 * Just like the `class` prop, we can recieve a function that has the state of the component as a destructred parameter.\
	 * This function can return a string or an object. The object will be converted from camelCase to kebeb-case automatically.
	 *
	 * But we _don't_ need to pass a function, a regular string or object will do just fine.
	 * @example
	 * ```svelte
	 * <SelectOption value="1" style={({ hovered }) => ({
	 * 	backgroundColor: hovered ? 'red' : undefined
	 * })}>
	 * 	Item 1
	 * </SelectOption>
	 * ```
	 * Any select option that is hovered will have a red background.
	 *
	 * It is **important** that return `undefined` or `null` if the condition isn't met as CSS will still accept string as a valid value.
	 */
	style?: StyleProp<S>;
	/**
	 * The reference to the underlying element.
	 *
	 * ### `$bindable`
	 */
	ref?: E;
	/**
	 * The current ID of the element.
	 *
	 * If no ID is provided, Lithesome will use Svelte's inbuilt `$props.id()` function to generate and unique ID.
	 */
	id?: string;
}

/** Default, used for when a component renders an element with children */
export interface Props<E extends HTMLElement, P, S> extends PropsNoChildren<E, S> {
	/**
	 * The default snippet to render.
	 */
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	/**
	 * Snippet to be used when wanting a custom implementation.
	 *
	 * This will tell Lithesome not the render the default element and any state along with it.
	 */
	custom?: Snippet<[S extends Record<string, any> ? { props: P; state: S } : { props: P }]>;
}

/** Used if the element does render wrapper element with children, but does not allow for the custom snippet. */
export type PropsNoCustom<E extends HTMLElement, P, S> = Omit<Props<E, P, S>, 'custom'>;

/** Used if the element does render children, but does not wrap said children in an element. */
export interface PropsNoRender<S> {
	/**
	 * The default snippet to render.
	 */
	children?: Snippet<[S extends Record<string, any> ? S : never]>;
	/**
	 * The current ID of the element.
	 *
	 * If no ID is provided, Lithesome will use Svelte's inbuilt `$props.id()` function to generate and unique ID.
	 */
	id?: string;
}

export interface FloatingContent {
	/**
	 * The current visibility of the contents.
	 *
	 * ### `$bindable`
	 */
	visible?: boolean;
	/**
	 * Disables the entire component tree.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * The DOM target to mount the content to.
	 */
	portalTarget?: HTMLElement | string;
	/**
	 * The underlying FloatingUI config.
	 */
	floatingConfig?: FloatingConfig;
}
