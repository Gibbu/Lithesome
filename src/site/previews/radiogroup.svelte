<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/index.js';
	import { cn } from '$site/utils.js';

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
					'flex w-full gap-4 rounded-md border border-white/20 bg-white/5 p-4 backdrop-blur',
					checked ? 'bg-white text-black' : ''
				)}
		>
			{#snippet children({ checked })}
				<div
					class={cn(
						'flex h-6 w-6 items-center justify-center rounded-full border-2',
						checked ? 'border-black' : 'border-white'
					)}
				>
					{#if checked}
						<div class="h-3 w-3 rounded-full bg-black" />
					{/if}
				</div>
				{label}
			{/snippet}
		</RadioGroupItem>
	{/each}
</RadioGroup>
