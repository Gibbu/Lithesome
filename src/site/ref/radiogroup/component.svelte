<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/index.js';
	import { cn } from '$site/index.js';

	const options = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'toph', label: 'Greatest Earthbender Alive' }
	];

	let value = $state('aang');
</script>

<RadioGroup bind:value class="flex w-[70%] flex-col gap-2">
	{#each options as { value, label }}
		<RadioGroupItem
			{value}
			class={({ checked }) =>
				cn(
					'flex w-full items-center gap-4 rounded-md border p-4 backdrop-blur',
					'border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800',
					checked ? 'bg-black text-white dark:bg-white dark:text-black' : ''
				)}
		>
			{#snippet children({ checked })}
				<div
					class={cn(
						'flex h-6 w-6 items-center justify-center rounded-full border-2',
						checked ? 'border-white dark:border-black' : 'border-black dark:border-white'
					)}
				>
					{#if checked}
						<div class="h-3 w-3 rounded-full bg-white dark:bg-black"></div>
					{/if}
				</div>
				{label}
			{/snippet}
		</RadioGroupItem>
	{/each}
</RadioGroup>

<span class="pointer-events-none absolute bottom-2 right-2 select-none text-xs opacity-40">Value: {value}</span>
