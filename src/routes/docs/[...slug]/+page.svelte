<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	let { data } = $props();

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;
	let component = $derived(data.component) as unknown as Component;
</script>

<svelte:component this={component} />
