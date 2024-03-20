<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { cn } from './utils.js';

	interface Props {
		component: typeof SvelteComponent<any, any, any>;
		// code: string;
		class?: string;
	}

	let { component, class: klass }: Props = $props();
</script>

<div
	class={cn(
		'not-prose flex-centre min-h-[450px] rounded-xl border border-white/20 bg-black/30 p-8 backdrop-blur',
		klass
	)}
>
	<svelte:component this={component} />
</div>
