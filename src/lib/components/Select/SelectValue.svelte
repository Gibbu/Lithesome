<script lang="ts">
	import { context } from './Select.svelte';
	import { useActions, classProp, type BasePropsNoChildren } from '$lib/internal/index.js';

	interface Props extends BasePropsNoChildren<HTMLSpanElement, { placeholderVisible: boolean }> {
		placeholder?: string;
	}

	let { class: klass, use = [], self = $bindable(), placeholder = 'Select an option...', ...props }: Props = $props();

	const ctx = context();
	const placeholderVisible = $derived(ctx.selectedOptions.length === 0);
</script>

<span
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('value')}
	class={classProp(klass, { placeholderVisible })}
	data-selectvalue=""
	data-placeholder={placeholderVisible || undefined}
	{...props}
>
	{placeholderVisible ? placeholder : ctx.selectedOptions.map((el) => el.dataset.label).join(',')}
</span>
