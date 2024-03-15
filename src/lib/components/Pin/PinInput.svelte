<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, type BaseProps, createUID, KEYS } from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';

	interface Props extends Omit<BaseProps<HTMLInputElement, { filled: boolean; disabled: boolean }>, 'children'> {
		/** The HTML Input element name attribute. */
		name?: string;
	}

	let { class: klass, use = [], self, name, ...props } = $props<Props>();
	let value = $state<string>('');

	const API = context();
	const { uid } = createUID('input');
	const classProp = $derived(
		typeof klass === 'function' ? klass({ filled: API.filled, disabled: API.disabled }) : klass
	);
	const index = $derived(API.inputs.indexOf(uid()));
	let focused = $state<boolean>(false);

	onMount(() => {
		if (!API) log.error('<PinInput /> must be a direct child of <Pin />');
		API.register(uid());
	});

	$effect(() => {
		API.setValue(index, value);
	});

	const handleInput = async (event: Event) => {
		if (API.disabled) return;
		const e = event as InputEvent;

		if (e.inputType !== 'insertText') return;
		await tick();
		if (value.length > 1) {
			value = e.data!;
		}
		if (value.length === 1) {
			moveFocus('next');
			return;
		}
	};
	const handleKeyDown = (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
		if (API.disabled) return;
		const { key } = e;

		if (key === KEYS.arrowLeft) {
			e.preventDefault();
			moveFocus('prev');
		}
		if (key === KEYS.arrowRight) {
			e.preventDefault();
			moveFocus('next');
		}
		if (index === API.inputs.length - 1 && value.length === 0 && key === KEYS.backspace) {
			moveFocus('prev');
			return;
		}
		if (key === KEYS.backspace && value.length === 0) {
			moveFocus('prev');
			return;
		}
	};

	const handleFocus = () => {
		if (API.disabled) return;
		focused = true;
	};
	const handleBlur = () => {
		if (API.disabled) return;
		focused = false;
	};

	const moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
		const dir = {
			next: index + 1,
			prev: index - 1,
			first: 0,
			last: API.inputs.length - 1
		};
		const target = API.inputs[dir[direction]];
		if (target) (document.querySelector(`#${target}`) as HTMLInputElement)?.focus();
	};
</script>

<input
	bind:this={self}
	bind:value
	id={uid()}
	use:useActions={use}
	class={classProp}
	{name}
	disabled={API.disabled}
	data-pininput=""
	data-filled={API.filled || undefined}
	placeholder={focused ? '' : API.placeholder}
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onblur={handleBlur}
	{...props}
/>
