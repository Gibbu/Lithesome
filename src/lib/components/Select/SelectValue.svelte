<script lang="ts">
	import { context } from './Select.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';

	interface Props extends Omit<BaseProps<HTMLSpanElement, { placeholderVisible: boolean }>, 'children'> {
		placeholder?: string;
	}

	let { class: klass, use = [], self, placeholder, ...props }: Props = $props();

	const API = context();
	const placeholderVisible = $derived(API.selectedOptions.length === 0);
	const classProp = $derived(typeof klass === 'function' ? klass({ placeholderVisible }) : klass);
</script>

<span
	bind:this={self}
	use:useActions={use}
	id={API.uid('value')}
	class={classProp}
	data-selectvalue=""
	data-placeholder={placeholderVisible || undefined}
	{...props}
>
	{placeholderVisible ? placeholder : API.selectedOptions.map((el) => el.label).join(',')}
</span>
