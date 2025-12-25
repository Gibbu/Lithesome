import type { FloatingConfig, JsonValue, Props, PropsNoChildren, PropsNoRender } from '$lib/internals/index.js';
import type { PortalTarget } from '$lib/types/index.js';

//
// ~ROOT
//
export interface SelectProps<S = any, V extends JsonValue = any> extends PropsNoRender<S> {
	value?: V;
	visible?: boolean;
	multiple?: boolean;
	disabled?: boolean;
	floatingConfig?: FloatingConfig;
	portalTarget?: PortalTarget;
	onValueChanged?: (value: V) => void;
}

//
// ~TRIGGER
//
export interface SelectTriggerProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~CONTENT
//
export interface SelectContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~ARROW
//
export interface SelectArrowProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~OPTION
//
export interface SelectOptionProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value: JsonValue;
	disabled?: boolean;
	label?: string;
}

//
// ~VALUE
//
export interface SelectValueProps<P = any, S = any> extends PropsNoChildren<HTMLElement, S> {
	placeholder?: string;
}
