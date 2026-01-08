<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useMenuItem } from './state.svelte.js';

	import type { MenuItemProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		disabled = $bindable(false),
		closeOnClick = true,
		href,
		ref = $bindable(),
		...props
	}: MenuItemProps<typeof ctx.props> & Record<string, any> = $props();

	let ctx = useMenuItem({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		disabled: stateValue(() => disabled),
		closeOnClick: stateValue(() => closeOnClick)
	});
</script>

<Element bind:ref as={href ? 'a' : 'button'} {href} {children} {custom} {ctx} {...props} />
