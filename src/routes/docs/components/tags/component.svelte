<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import { Tags, TagsDelete, TagsInput, TagsItem } from '$lib/index.js';
	import { cn } from '$site/utils.js';

	let tags = $state<string[]>(['svelte5', 'typescript', 'tailwind']);
</script>

<div>
	<p class="mb-2 text-sm">What's your stack?</p>
	<Tags
		bind:value={tags}
		class={({ invalid }) => [
			'flex cursor-text items-center gap-2 border p-2',
			invalid
				? 'border-red-500'
				: ['border-neutral-300 dark:border-neutral-800', 'focus-within:border-dark dark:focus-within:border-white']
		]}
	>
		<div class="inline-flex flex-wrap gap-1">
			{#each tags as tag}
				<TagsItem
					value={tag}
					class={({ active }) => [
						'flex cursor-default items-stretch overflow-hidden border text-sm font-semibold',
						active
							? 'bg-teal-500 text-black'
							: 'border-zinc-400 bg-zinc-200 text-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
					]}
				>
					<span class="py-1.5 pr-1 pl-2.5">{tag}</span>
					<TagsDelete
						value={tag}
						class="flex cursor-pointer items-center px-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
					>
						<XIcon class="size-4" />
					</TagsDelete>
				</TagsItem>
			{/each}
		</div>
		<TagsInput
			class={({ invalid }) =>
				cn('h-8 border-transparent bg-transparent focus:outline-none', invalid ? 'text-red-500' : '')}
		/>
	</Tags>
</div>

<div class="absolute right-2 bottom-2 text-xs opacity-20">
	{tags}
</div>
