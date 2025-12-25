export type OutsideExcludeElement = HTMLElement | string | null | undefined;

export interface OutsideOptions {
	/**
	 * Any elements to be excluded from the check.
	 *
	 * Strings or HTMLElements can be passed.
	 *
	 * @example
	 * ```ts
	 * {@attach outside(callback, {
	 *  exlcude: ['.my-button', '.exclude-outside']
	 * })}
	 * ```
	 */
	exclude?: OutsideExcludeElement[];

	/**
	 * The event used to call the given callback.
	 *
	 * @default
	 * 'click'
	 */
	on?: keyof HTMLElementEventMap;
}
