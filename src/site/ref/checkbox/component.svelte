<script lang="ts">
	import { Checkbox } from '$lib/index.js';
	import { cn } from '$site/index.js';
	import { Check, Minus } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div class="flex items-center gap-4">
	<Checkbox
		checked="mixed"
		id="checkbox"
		class={({ checked }) =>
			cn(
				'flex h-8 w-8 rounded-md border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5',
				checked ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' : ''
			)}
	>
		{#snippet children({ checked })}
			{#if checked}
				<Icon src={checked === 'mixed' ? Minus : Check} class="m-auto h-6 w-6" />
			{/if}
		{/snippet}
	</Checkbox>
	<label for="checkbox" class="cursor-pointer select-none">I agree to sell all my data 👍</label>
</div>
