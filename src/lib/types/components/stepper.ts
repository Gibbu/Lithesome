import type { Props, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface StepperProps<S = any> extends PropsNoRender<S> {
	/**
	 * The current active step.
	 */
	step?: string;
	/**
	 *  Disables the entire component tree.
	 */
	disabled?: boolean;
	/**
	 * Fires when the `step` property has changed.
	 */
	onStepChange?: (activeStep: string) => void;
	/**
	 * Fires when the `StepperPrev` button has been clicked.
	 */
	onPrevStep?: (activeStep: string) => void;
	/**
	 * Fires when the `StepperNext` button has been clicked.
	 */
	onNextStep?: (activeStep: string) => void;
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
	 * The unique ID of the step to jump to.
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
