<script lang="ts">
	import { Combobox, ComboboxContent, ComboboxInput, ComboboxOption, ComboboxArrow } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { Check, ChevronDown } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { scale } from 'svelte/transition';

	const options = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'sokka', label: 'Councilman Sokka' },
		{ value: 'katara', label: 'Katara', disabled: true },
		{ value: 'toph', label: 'Greatest Earthbender Alive' },
		{ value: 'iroh', label: 'Uncle Iroh' },
		{ value: 'azula', label: 'Firebending Prodigy' }
	];
	let value = $state('aang');
	let query = $state('Avatar Aang');
	let touched = $state(false);
	let label = $state('');

	const filteredOptions = $derived(
		touched
			? options.filter(
					(item) =>
						item.value.toLowerCase().includes(query.toLowerCase()) ||
						item.label.toLowerCase().includes(query.toLowerCase())
				)
			: options
	);
</script>

<Combobox
	bind:value
	bind:touched
	bind:label
	class="w-[350px]"
	onChange={(payload) => {
		if (payload?.label) query = payload.label;
	}}
>
	{#snippet children({ visible })}
		<div class="relative flex items-center">
			<ComboboxInput
				bind:value={query}
				class={cn(
					'w-full rounded-md border py-3 pl-3.5 pr-5 text-sm font-semibold',
					'border-neutral-300 bg-black/5 dark:border-white/10 dark:bg-white/5',
					'hover:border-neutral-400 dark:hover:border-white/20',
					'focusOutline'
				)}
			/>
			<Icon src={ChevronDown} class={cn('absolute right-4 h-4 w-4', visible ? 'rotate-180' : '')} />
		</div>

		<ComboboxContent
			class={cn(
				'z-10 origin-top translate-y-1 rounded-xl border p-2 shadow-xl backdrop-blur',
				'border-neutral-300 bg-white shadow-neutral-200',
				'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
			)}
			transition={[scale, { start: 0.8, duration: 150 }]}
			sameWidth
		>
			{#each filteredOptions as { value, label, disabled } (value)}
				<ComboboxOption
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
				</ComboboxOption>
			{:else}
				<span class="block p-3 text-sm text-neutral-400 dark:text-neutral-500">No results found...</span>
			{/each}
		</ComboboxContent>
	{/snippet}
</Combobox>

<span class="pointer-events-none absolute bottom-2 right-2 select-none text-xs opacity-40">Value: {value}</span>
