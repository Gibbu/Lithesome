<script lang="ts">
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';
	import { Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from '$lib/index.js';
	import { Button, Container } from '$site/index.js';

	const options = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'sokka', label: 'Councilman Sokka', disabled: true },
		{ value: 'katara', label: 'Katara' },
		{ value: 'toph', label: 'Greatest Earthbender' },
		{ value: 'iroh', label: 'Uncle Iroh' },
		{ value: 'azula', label: 'Firebending Prodigy' }
	];

	let value = $state('aang');
</script>

<Select bind:value>
	<SelectTrigger>
		{#snippet custom({ props })}
			<Button variant="secondary" class="w-[250px] justify-between" {...props}>
				<SelectValue />
				<ChevronsUpDownIcon class="size-4" />
			</Button>
		{/snippet}
	</SelectTrigger>
	<SelectContent>
		{#snippet custom({ props, state })}
			{#if state.visible}
				<Container {...props} bodyClass="p-0 py-3" containerClass="w-[300px] z-10">
					{#each options as { value, label, disabled }}
						<SelectOption
							{value}
							{disabled}
							class={({ hovered, selected }) => [
								'flex w-full cursor-pointer items-center gap-2 py-2 pr-6 pl-14 text-left',
								hovered && 'bg-zinc-900 text-zinc-200',
								selected && 'text-teal-500',
								disabled && 'opacity-40'
							]}
						>
							{#snippet children({ selected, hovered })}
								{#if selected}
									<CheckIcon class="absolute left-6 size-4 {hovered ? 'text-zinc-200' : 'text-teal-500'}" />
								{/if}
								{label}
							{/snippet}
						</SelectOption>
					{/each}
				</Container>
			{/if}
		{/snippet}
	</SelectContent>
</Select>

<span class="site-value">{value}</span>
