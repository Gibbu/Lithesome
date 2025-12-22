<script lang="ts">
	import { CircleAlertIcon, CircleXIcon, InfoIcon, XIcon } from '@lucide/svelte';
	import { cn } from '$site/utils.js';
	import Button from './Button.svelte';

	import type { ClassValue } from 'svelte/elements';

	interface Props {
		type: 'info' | 'warning' | 'error';
		message: string;
		class?: ClassValue;
		dismissable?: boolean;
		onDismiss?: () => void;
	}

	let { message, type, class: klass, dismissable = false, onDismiss }: Props = $props();

	const Icon = {
		info: InfoIcon,
		warning: CircleAlertIcon,
		error: CircleXIcon
	}[type];

	const colour = {
		info: ['border-sky-400/50', 'bg-sky-500/10'],
		warning: ['border-amber-400/50', 'bg-amber-500/10'],
		error: ['border-rose-400/50', 'bg-rose-500/10']
	}[type];
</script>

<div
	class={[
		'not-prose relative flex items-center gap-4 border p-4',
		{
			info: 'border-sky-500/10 bg-sky-500/10',
			warning: 'border-amber-500/10 bg-amber-500/10',
			error: 'border-rose-500/10 bg-rose-500/10'
		}[type],
		klass
	]}
>
	<div class="pointer-events-none absolute -top-[2px] -left-[2px] size-4 border-t-2 border-l-2 {colour[0]}"></div>
	<div class="pointer-events-none absolute -top-[2px] -right-[2px] size-4 border-t-2 border-r-2 {colour[0]}"></div>
	<div class="flex items-center gap-4">
		<Icon
			class={cn(
				{ info: 'text-sky-400', warning: 'text-amber-400', error: 'text-rose-400' }[type],
				'max-h-6 min-h-6 max-w-6 min-w-6 leading-relaxed'
			)}
		/>
		<p
			class={[
				'text-sm leading-relaxed',
				{
					info: 'text-sky-700 dark:text-sky-100',
					warning: 'text-amber-700 dark:text-amber-100',
					error: 'text-red-700 dark:text-red-100'
				}[type]
			]}
		>
			{message}
		</p>
	</div>
	{#if dismissable}
		<Button variant="text" onclick={onDismiss}>
			<XIcon class="size-4" />
		</Button>
	{/if}
	<div class="pointer-events-none absolute -bottom-[2px] -left-[2px] size-4 border-b-2 border-l-2 {colour[0]}"></div>
	<div class="pointer-events-none absolute -right-[2px] -bottom-[2px] size-4 border-r-2 border-b-2 {colour[0]}"></div>
</div>
