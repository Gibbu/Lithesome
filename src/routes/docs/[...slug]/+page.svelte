<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	let { data } = $props();

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;
	const component = $derived(data.component) as unknown as Component;
</script>

<svelte:component this={component} />
