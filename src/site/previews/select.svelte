<script lang="ts">
	import { Select, SelectDropdown, SelectOption, SelectTrigger, SelectValue } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { Check, ChevronDown } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { scale } from 'svelte/transition';

	const options = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'sokka', label: 'Councilman Sokka' },
		{ value: 'katara', label: 'Katara', disabled: true },
		{ value: 'toph', label: 'Greatest Earthbender Alive' }
	];
	let value = $state('aang');
</script>

<Select bind:value>
	<SelectTrigger>
		<Button variant="primary" class="w-[250px] max-w-[250px] justify-start truncate text-left">
			<SelectValue placeholder="Select an option..." class="flex-1 truncate" />
			<Icon src={ChevronDown} class="h-6 w-6" />
		</Button>
	</SelectTrigger>
	<SelectDropdown
		sameWidth
		class="origin-top rounded-xl border border-white/20 bg-black/75 p-2 shadow-xl backdrop-blur"
		transition={[scale, { start: 0.8, duration: 150 }]}
	>
		{#each options as { value, label, disabled }}
			<SelectOption
				{value}
				{disabled}
				class={({ hovered, selected }) =>
					cn(
						disabled ? 'text-white/30' : '',
						hovered ? 'bg-white/10 text-white' : '',
						selected ? 'text-violet-500' : '',
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
	</SelectDropdown>
</Select>
