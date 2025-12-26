import type { Orientation, Props, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface StepperProps<S = any> extends PropsNoRender<S> {
	/**
	 * The current active step.
	 */
	step?: string;
	/**
	 * Disables the entire component tree.
	 */
	disabled?: boolean;
	/**
	 * Which direction in which the stepper is being used.
	 *
	 * This will change the direction of the arrow keys used when keyboard navigating.
	 */
	orientation?: Orientation;
	/**
	 * Fires when the `step` property has changed.
	 */
	onStepChange?: (activeStep: string) => void;
	/**
	 * Fires when the stepper has gone back a previous step.
	 */
	onPrevStep?: (activeStep: string) => void;
	/**
	 * Fires when the stepper has gone forward a step.
	 */
	onNextStep?: (activeStep: string) => void;
}

//
// ~STEPS
//
export interface StepperStepsProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~LINK
//
export interface StepperLinkProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * The unique ID of the `<StepperItem />` to jump to.
	 */
	item: string;
	/**
	 * Skips checking if the step to jump to is available.
	 *
	 * This means if step 2 and 3 has a canDoNext check, pressing step 4 will redirect to step 2.
	 */
	skipCanDoNext?: boolean;
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}

//
// ~ITEM
//
export interface StepperItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The unique ID of the stepper.
	 */
	name: string;
	/**
	 * This condition must be met to move to the next step.
	 */
	canGoNext?: () => boolean;
}

//
// ~PREV
//
export interface StepperPrevProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}

//
// ~NEXT
//
export interface StepperNextProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}

//
// ~JUMP
//
export interface StepperJumpProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * The unique ID of the `<StepperItem />` to jump to.
	 */
	name: string;
	/**
	 * Skips checking if the step to jump to is available.
	 *
	 * This means if step 2 and 3 has a canDoNext check, pressing step 4 will redirect to step 2.
	 */
	skipCanDoNext?: boolean;
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}
