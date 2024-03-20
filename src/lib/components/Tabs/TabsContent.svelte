<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		value: string;
	}

	let { children, class: klass, use = [], self, value, ...props }: Props = $props();

	const API = context();
	const active = $derived(API.activeTab === value);
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp}
	role="tabpanel"
	hidden={!active ? true : undefined}
	data-tabscontent=""
	data-state={active ? 'active' : 'inactive'}
	data-value={value}
	data-orientation={API.orientation}
	{...props}
>
	{@render children({ active })}
</div>
