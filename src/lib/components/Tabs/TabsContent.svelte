<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, classProp } from '$internal';
	import type { TabsContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), value, ...props }: TabsContentProps = $props();

	const ctx = context();
	const active = $derived(ctx.activeTab === value);
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
	data-orientation={ctx.orientation}
	style:display={!active ? 'none' : undefined}
	{...props}
>
	{@render children({ active })}
</div>
