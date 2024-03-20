<script lang="ts">
	import { Checkbox } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { Check, Minus } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let checked = $state<boolean | 'mixed'>(false);
</script>

<div class="flex items-center gap-4">
	<Checkbox
		bind:checked
		id="checkbox"
		class={cn(
			'flex h-8 w-8 rounded-md border border-white/10 bg-white/5',
			checked ? 'border-white bg-white text-black' : ''
		)}
	>
		{#if checked}
			<Icon src={checked === 'mixed' ? Minus : Check} class="m-auto h-6 w-6" />
		{/if}
	</Checkbox>
	<label for="checkbox" class="cursor-pointer select-none">I agree to sell all my data 👍</label>
</div>
