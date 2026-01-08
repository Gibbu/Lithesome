import type { Orientation, Props, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface StepperProps extends PropsNoRender<StepperState> {
	/**
	 * The current active step.
	 *
	 * ### `$bindable`
	 */
	step?: string;
	/**
	 * Disables the entire component tree.
	 *
	 * ### `$bindable`
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
export interface StepperState {
	/**
	 * The previously active step.
	 */
	previousStep: string | undefined;
	/**
	 * The index of the previously active step.
	 */
	previousStepIndex: number;
	/**
	 * The active step.
	 */
	currentStep: string | undefined;
	/**
	 * The index of the active step.
	 */
	currentStepIndex: number;
	/**
	 * True if the component is disabled.
	 */
	disabled: boolean;
	/**
	 * True if the step index is 0.
	 */
	isFirstStep: boolean;
	/**
	 * True if the step index is the last.
	 */
	isLastStep: boolean;
}

//
// ~STEPS
//
export interface StepperStepsProps<P = any> extends Props<HTMLElement, P, StepperStepsState> {}
export interface StepperStepsState {
	/**
	 * The index of the active step.
	 */
	currentStepIndex: number;
}

//
// ~LINK
//
export interface StepperLinkProps<P = any> extends Props<HTMLButtonElement, P, StepperLinkState> {
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
export interface StepperLinkState {
	/**
	 * The index of the related item.
	 */
	currentStepIndex: number;
	/**
	 * True if the list is currently active.
	 */
	active: boolean;
	/**
	 * The name of the related item.
	 */
	itemName: string;
}

//
// ~ITEM
//
export interface StepperItemProps<P = any> extends Props<HTMLElement, P, StepperItemState> {
	/**
	 * The unique ID of the stepper.
	 */
	name: string;
	/**
	 * This condition must be met to move to the next step.
	 */
	canGoNext?: () => boolean;
}
export interface StepperItemState {
	/**
	 * The index of the item.
	 */
	index: number;
	/**
	 * The unique name of the item.
	 */
	name: string;
}

//
// ~PREV
//
export interface StepperPrevProps<P = any> extends Props<HTMLButtonElement, P, StepperPrevState> {
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}
export interface StepperPrevState {
	/**
	 * True if:
	 * - Parent `<Stepper />` component is disabled.
	 * - `disabled` prop is true.
	 * - The current step index is 0.
	 */
	disabled: boolean;
	/**
	 * True if the current step index is not 0.
	 */
	canGoPrev: boolean;
}

//
// ~NEXT
//
export interface StepperNextProps<P = any> extends Props<HTMLButtonElement, P, StepperNextState> {
	/**
	 * Disables the button, stopping events from firing.
	 */
	disabled?: boolean;
}
export interface StepperNextState {
	/**
	 * True if:
	 * - Parent `<Stepper />` component is disabled.
	 * - `disabled` prop is true.
	 * - The current step index is 0.
	 */
	disabled: boolean;
	/**
	 * True if:
	 * - `canGoNext` function is given and passed.
	 * - Will return value of the `disabled` prop if `canDoNext` is not passed.
	 */
	canGoNext: boolean;
}
