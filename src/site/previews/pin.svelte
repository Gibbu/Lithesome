<script lang="ts">
	import { Pin, PinInput, PinValue } from '$lib/index.js';

	// let value = $state<string[]>([]);
</script>

<Pin class="flex gap-2">
	{#each [1, 2, 3, 4] as arr}
		<PinInput class="h-12 w-12 rounded-md border border-white/10 bg-white/5 text-center text-xl" />
	{/each}
	<PinValue name="value" />
</Pin>
