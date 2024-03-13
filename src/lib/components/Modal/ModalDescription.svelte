<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLParagraphElement> {}

	let { children, class: klass, use = [], self, ...props } = $props<Props>();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<p
	id={API.uid('description')}
	bind:this={self}
	data-modaldescription=""
	use:useActions={use}
	class={classProp}
	{...props}
>
	{@render children({})}
</p>
