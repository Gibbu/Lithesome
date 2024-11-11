import { use, self, type ComponentReference } from '$site/index.js';

const slider: ComponentReference = {
	name: 'Slider',
	props: [
		{
			name: 'value',
			type: 'number',
			default: '50',
			description: 'The current value of the slider.'
		},
		{
			name: 'min',
			type: 'number',
			default: '0',
			description: 'The minimum value of the slider.'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'The maximum value of the slider.'
		},
		{
			name: 'step',
			type: 'number',
			default: '1',
			description: 'Each step between the minimum and maximum values.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Defines the way the slider starts and ends.'
		},
		{
			name: 'reverse',
			type: 'boolean',
			default: 'false',
			description: 'Switches the slider the opposite direction.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the slider.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'value',
			type: 'number'
		},
		{
			name: 'percentage',
			type: 'number',
			description: 'The overall progress of the slider.'
		}
	],
	dataAttrs: [
		{
			name: 'value',
			description: 'The value of the slider.'
		},
		{
			name: 'percentage',
			description: 'The overall progress of the slider.'
		},
		{
			name: 'reversed',
			value: 'true',
			description: 'This is only applied if true.'
		},
		{
			name: 'orientation',
			value: "'horizontal' | 'vertical'"
		}
	],
	events: [
		{
			name: 'onMousedown',
			params: ['e: MouseEvent'],
			return: 'void'
		},
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	]
};

const thumb: ComponentReference = {
	name: 'SliderThumb',
	childOf: slider.name,
	events: [
		{
			name: 'onMousedown',
			params: ['e: MouseEvent'],
			return: 'void'
		},
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	]
};

const range: ComponentReference = {
	name: 'SliderRange',
	childOf: slider.name,
	dataAttrs: [
		{
			name: 'value',
			description: 'The value of the slider.'
		},
		{
			name: 'percentage',
			description: 'The overall progress of the slider.'
		},
		{
			name: 'reversed',
			value: 'true',
			description: 'This is only applied if true.'
		},
		{
			name: 'orientation',
			value: "'horizontal' | 'vertical'"
		}
	]
};

const value: ComponentReference = {
	name: 'SliderValue',
	childOf: slider.name,
	description: 'A hidden value for form submissions.'
};

export default [slider, thumb, range, value];
