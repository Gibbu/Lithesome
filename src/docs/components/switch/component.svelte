<script lang="ts">
	import { Switch } from '$lib/index.js';
	import { cn } from '$site/index.js';
</script>

<div class="flex items-center gap-4">
	<Switch
		id="switch"
		class={({ checked }) =>
			cn(
				'h-8 w-14 rounded-full px-1 transition-colors',
				checked ? 'bg-black dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
			)}
	>
		{#snippet children({ checked })}
			<span
				class={cn(
					'block size-6 rounded-full bg-white shadow-md transition-transform',
					checked ? 'translate-x-6 dark:bg-black' : ''
				)}
			></span>
		{/snippet}
	</Switch>
	<label for="switch" class="ml-1 cursor-pointer select-none">Email notifications</label>
</div>
