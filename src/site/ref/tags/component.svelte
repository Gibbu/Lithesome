<script lang="ts">
	import { Tags, TagsInput, TagsDelete } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { XIcon } from 'lucide-svelte';

	let tags = $state<string[]>(['svelte5', 'typescript']);
</script>

<Tags bind:value={tags} class="flex min-w-[450px] max-w-[450px] flex-col gap-2">
	<TagsInput
		class={cn(
			'rounded-md border border-neutral-800 bg-transparent px-3.5 py-2.5',
			'focus:border-black focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black',
			'dark:focus:border-white dark:focus:outline-white'
		)}
	/>
	<div class="inline-flex flex-wrap gap-1">
		{#each tags as tag}
			<span
				class={cn(
					'flex items-stretch overflow-hidden rounded-md text-sm font-semibold',
					'bg-black/10 text-black dark:bg-white/10 dark:text-white'
				)}
			>
				<span class="py-1.5 pl-2.5 pr-1">{tag}</span>
				<TagsDelete class="px-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" {tag}>
					<XIcon class="size-4" />
				</TagsDelete>
			</span>
		{/each}
	</div>
</Tags>
