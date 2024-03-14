<script lang="ts">
	import { context } from './RadioGroup.svelte';
	import { log, useActions, type BaseProps, createUID, type JsonValue } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { checked: boolean }> {
		value: JsonValue;
		disabled?: boolean;
	}

	let { children, class: klass, use = [], self, disabled = false, value, ...props } = $props<Props>();

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API) log.error('<RadioGroupItem /> must be a direct child of <RadioGroup />');
		if (!disabled)
			API.register({
				id: uid(),
				value,
				disabled
			});
	});

	const checked = $derived(API.selectedItem.id === uid());
	const classProp = $derived(typeof klass === 'function' ? klass({ checked }) : klass);
</script>

<button
	type="button"
	role="radio"
	aria-checked={checked}
	tabindex={checked ? 0 : -1}
	bind:this={self}
	id={uid()}
	use:useActions={use}
	class={classProp}
	data-radiogroupitem=""
	data-disabled={disabled || undefined}
	data-state={checked ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ checked })}
</button>
