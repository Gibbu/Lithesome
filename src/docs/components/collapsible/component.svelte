<script lang="ts">
	import { Collapsible, CollapsibleButton, CollapsibleContent } from '$lib/index.js';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let items = ['Hamburger', 'Cheeseburger', 'Big Mac', 'Whopper'];
</script>

<Collapsible class="w-64">
	<div class="flex items-center justify-between gap-4">
		<span>Super Secret Items</span>
		<CollapsibleButton class="flex size-7 rounded-md bg-black text-white dark:bg-white dark:text-black">
			<ChevronsUpDown class="m-auto size-4" />
		</CollapsibleButton>
	</div>
	<CollapsibleContent class="mt-3 flex flex-col gap-1" transition={[slide]}>
		{#each items as item}
			<div class="rounded-md bg-black/5 px-3 py-2 text-sm dark:bg-white/5">
				<p>{item}</p>
			</div>
		{/each}
	</CollapsibleContent>
</Collapsible>
