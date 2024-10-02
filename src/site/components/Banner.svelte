<script lang="ts">
	import { useActions, type Props } from '$internal';
	import { Info, AlertOctagon, XIcon } from 'lucide-svelte';
	import { cn } from '../utils.js';

	interface ComponentProps extends Props<HTMLElement> {
		type: 'info' | 'warning';
		dismissable?: boolean;
		onClick?: () => void;
	}

	let {
		children,
		class: klass,
		use = [],
		self,
		type,
		dismissable = false,
		onClick,
		...props
	}: ComponentProps = $props();

	const Icon = { info: Info, warning: AlertOctagon }[type];
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={cn(
		'flex items-start gap-4 rounded-md border p-4',
		type === 'info'
			? 'border-blue-500/20 bg-blue-600/10 text-blue-500 dark:border-blue-400/15 dark:bg-blue-500/15 dark:text-blue-300'
			: '',
		type === 'warning'
			? 'border-amber-600/20 bg-amber-600/15 text-amber-500 dark:border-amber-400/10 dark:bg-amber-500/10 dark:text-amber-200'
			: '',
		klass
	)}
	{...props}
>
	<Icon class="size-6" />
	<div class="flex-1">
		{@render children?.({})}
	</div>
	{#if dismissable}
		<button type="button" class="rounded-md p-1 hover:bg-white/10" onclick={() => onClick?.()}>
			<XIcon class="h-4 w-4" />
		</button>
	{/if}
</div>
