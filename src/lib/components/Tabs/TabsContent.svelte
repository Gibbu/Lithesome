<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		value: string;
	}

	let { children, class: klass, use = [], self = $bindable(), value, ...props }: Props = $props();

	const API = context();
	const active = $derived(API.activeTab === value);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { active })}
	role="tabpanel"
	hidden={!active ? true : undefined}
	data-tabscontent=""
	data-state={active ? 'active' : 'inactive'}
	data-value={value}
	data-orientation={API.orientation}
	style:display={!active ? 'none' : undefined}
	{...props}
>
	{@render children({ active })}
</div>
