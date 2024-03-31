<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { cn } from './utils.js';

	interface Props {
		component: typeof SvelteComponent<any, any, any>;
		props: Record<string, any>;
		class?: string;
	}

	let { component, props, class: klass }: Props = $props();
</script>

<div
	class={cn(
		'not-prose flex-centre highlight relative min-h-[450px] flex-col rounded-xl bg-neutral-100 p-8 backdrop-blur dark:bg-neutral-900',
		klass
	)}
>
	<svelte:component this={component} {...props} />
</div>
