<script lang="ts">
	import { useOutside } from '$lib/index.js';

	let outside = $state(false);
	let count = $state(0);
</script>

<div class="flex flex-col items-center">
	<button
		type="button"
		class="rounded-md bg-black px-24 py-12 text-white dark:bg-white dark:text-black"
		use:useOutside={{
			callback() {
				outside = true;
				if (outside) count++;
			}
		}}
		onclick={() => {
			outside = false;
			count = 0;
		}}
	>
		Click outside
	</button>

	{#if outside}
		<p class="select-none">Clicked outside {count} time{count === 1 ? '' : 's'}.</p>
	{/if}
</div>
