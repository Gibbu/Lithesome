<script lang="ts">
	import { Checkbox, CheckboxButton, CheckboxLabel } from '$lib/index.js';
	import { cn } from '$site/index.js';
	import { CheckIcon, MinusIcon } from 'lucide-svelte';
</script>

<Checkbox>
	<div class="flex-items flex gap-4">
		<CheckboxButton
			class={({ checked }) =>
				cn(
					'flex h-8 w-8 rounded-md border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5',
					checked ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' : ''
				)}
		>
			{#snippet children({ checked })}
				{#if checked === 'mixed'}
					<MinusIcon />
				{:else if checked}
					<CheckIcon />
				{/if}
			{/snippet}
		</CheckboxButton>
		<CheckboxLabel class="cursor-pointer select-none">I agree to sell all my data 👍</CheckboxLabel>
	</div>
</Checkbox>
