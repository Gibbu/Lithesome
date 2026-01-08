<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import { CheckboxButton, CheckboxGroup, CheckboxLabel } from '$lib/index.js';
</script>

<CheckboxGroup class="flex items-center gap-3">
	<CheckboxButton
		class={({ checked }) => [
			'flex size-8 cursor-pointer border',
			checked ? 'border-teal-500 bg-teal-500' : ['border-zinc-400', 'border:border-zinc-800']
		]}
	>
		{#snippet children({ checked })}
			{#if checked}
				<CheckIcon class="m-auto size-5 text-black" />
			{/if}
		{/snippet}
	</CheckboxButton>
	<CheckboxLabel class="cursor-pointer select-none">I agree to sell my data 👍</CheckboxLabel>
</CheckboxGroup>
