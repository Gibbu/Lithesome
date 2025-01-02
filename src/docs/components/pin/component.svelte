<script lang="ts">
	import { Pin, PinInput, PinValue } from '$lib/index.js';
	import { cn } from '$site/utils.js';
</script>

<Pin class="flex gap-2">
	{#each { length: 4 }}
		<PinInput
			class={cn(
				'focusOutline h-16 w-12 rounded-md border border-neutral-200 bg-white text-center text-xl shadow-md placeholder:text-neutral-300',
				'dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:placeholder:text-neutral-600'
			)}
		/>
	{/each}
	<PinValue name="value" />
</Pin>
