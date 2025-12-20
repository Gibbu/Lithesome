<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/index.js';

	const items = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'toph', label: 'Greatest Earthbender' }
	];
	let value = $state<string>('zuko');
</script>

<RadioGroup bind:value class="space-y-4">
	{#each items as { value, label }}
		<RadioGroupItem {value} class="group flex cursor-pointer items-center gap-2">
			{#snippet children({ selected })}
				<div
					class={[
						'flex size-6 rounded-full border',
						selected
							? 'border-teal-500'
							: ['border-zinc-600 group-hover:border-zinc-900', 'dark:border-zinc-400 dark:group-hover:border-zinc-200']
					]}
				>
					{#if selected}
						<div class="m-auto size-4 rounded-full bg-teal-500"></div>
					{/if}
				</div>
				<span>
					{label}
				</span>
			{/snippet}
		</RadioGroupItem>
	{/each}
</RadioGroup>

<span class="site-value">{value}</span>
