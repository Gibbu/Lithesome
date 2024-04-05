<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { PopoverContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<PopoverContext>('popover');
</script>

<script lang="ts">
	import { useActions, KEYS, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		visible?: boolean;
	}

	let { children, use = [], class: klass, self = $bindable(), visible = $bindable(false), ...props }: Props = $props();

	const ctx = new PopoverContext(
		{ visible },
		{
			onChange(val) {
				visible = val;
			}
		}
	);
	setContext(contextName, ctx);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape) visible = false;
	};

	$effect(() => {
		ctx.visible = visible;
		if (visible) {
			window.addEventListener('keydown', handleKeys);
		} else {
			window.removeEventListener('keydown', handleKeys);
		}
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible })}
	data-popover=""
	data-state={ctx.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
