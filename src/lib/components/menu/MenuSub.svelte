<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createMenuSubContext } from './state.svelte.js';

	import type { MenuSubProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		children,
		name,
		visible = $bindable(false),
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {}
	}: MenuSubProps<typeof ctx.state> = $props();

	let ctx = createMenuSubContext({
		id: parseId(uid),
		name: stateValue(() => name.toLowerCase().replace(/ /g, '')),
		visible: stateValue(
			() => visible,
			(v) => {
				visible = v;
			}
		),
		disabled: stateValue(
			() => disabled,
			(v) => (disabled = v)
		),
		portalTarget: stateValue(() => portalTarget),
		floatingConfig: stateValue(() => floatingConfig)
	});
</script>

{@render children?.(ctx.state)}
