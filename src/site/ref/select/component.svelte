<script lang="ts">
	import { Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { Check, ChevronDown } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { scale } from 'svelte/transition';

	let { multiple = false }: { multiple: boolean } = $props();

	const options = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'sokka', label: 'Councilman Sokka' },
		{ value: 'katara', label: 'Katara', disabled: true },
		{ value: 'toph', label: 'Greatest Earthbender Alive' },
		{ value: 'iroh', label: 'Uncle Iroh' },
		{ value: 'azula', label: 'Firebending Prodigy' }
	];
	let value = $state(multiple ? ['aang'] : 'aang');
</script>

<Select bind:value>
	<SelectTrigger>
		<Button variant="primary" class="w-[250px] max-w-[250px] justify-start truncate text-left">
			<SelectValue placeholder="Select an option..." class="flex-1 truncate" />
			<Icon src={ChevronDown} class="h-6 w-6" />
		</Button>
	</SelectTrigger>
	<SelectContent
		sameWidth
		class={cn(
			'origin-top translate-y-1 rounded-xl border p-2 shadow-xl backdrop-blur ',
			'border-neutral-300 bg-white shadow-neutral-200',
			'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
		)}
		transition={[scale, { start: 0.8, duration: 150 }]}
	>
		{#each options as { value, label, disabled } (value)}
			<SelectOption
				{value}
				{disabled}
				class={({ hovered, selected }) =>
					cn(
						disabled ? 'text-black/40 line-through dark:text-white/30' : '',
						hovered ? 'bg-black/10 text-black dark:bg-white/10 dark:text-white' : '',
						selected ? 'text-teal-500' : '',
						'flex w-full items-center gap-2 truncate rounded-md px-3.5 py-2.5 text-sm'
					)}
			>
				{#snippet children({ selected })}
					<div class="flex-1 text-left">{label}</div>
					{#if selected}
						<Icon src={Check} class="h-4 w-4" />
					{/if}
				{/snippet}
			</SelectOption>
		{/each}
	</SelectContent>
</Select>

<span class="pointer-events-none absolute bottom-2 right-2 select-none text-xs opacity-40">Value: {value}</span>
