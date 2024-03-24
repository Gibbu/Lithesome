<script lang="ts">
	import { Pin, PinInput, PinValue } from '$lib/index.js';
</script>

<Pin class="flex gap-2">
	{#each [1, 2, 3, 4] as arr}
		<PinInput
			class="focusOutline h-12 w-12 rounded-md border border-neutral-200 bg-white text-center text-xl dark:border-white/10 dark:bg-white/5"
		/>
	{/each}
	<PinValue name="value" />
</Pin>
