<script lang="ts">
	import { Tags, TagsInput, TagsItem, TagsDelete } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { XIcon } from 'lucide-svelte';

	let tags = $state<string[]>(['svelte5', 'typescript', 'tailwind', 'lithesome']);
</script>

<Tags
	bind:value={tags}
	editable
	class={cn(
		'flex cursor-text items-center gap-2 rounded-md border p-2',
		'border-neutral-300 dark:border-neutral-800',
		'focus-within:border-dark dark:focus-within:border-white'
	)}
>
	<div class="inline-flex flex-wrap gap-1">
		{#each tags as tag}
			<TagsItem
				value={tag}
				class={({ active }) =>
					cn(
						'flex cursor-default items-stretch overflow-hidden rounded-md text-sm font-semibold',
						active ? 'bg-teal-500 text-black' : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
					)}
			>
				<span class="py-1.5 pl-2.5 pr-1">{tag}</span>
				<TagsDelete
					value={tag}
					class="px-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
					{tag}
				>
					<XIcon class="size-4" />
				</TagsDelete>
			</TagsItem>
		{/each}
	</div>
	<TagsInput
		class={({ invalid }) => cn('border-transparent bg-transparent focus:outline-none', invalid ? 'text-red-500' : '')}
	/>
</Tags>
