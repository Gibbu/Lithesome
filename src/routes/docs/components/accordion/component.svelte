<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { Accordion, AccordionButton, AccordionContent, AccordionHeading, AccordionItem } from '$lib/index.js';
	import { cn } from '$site/index.js';

	const items = [
		{
			title: 'What is Lithesome?',
			content:
				'Lithesome is a collection of unstyled Svelte 5 components that take care of all the functionality, leaving the visual design to you.',
			value: 'what-is-lithesome'
		},
		{ title: 'Is it good?', content: 'Well... Maybe... Idk...', value: 'is-it-good' },
		{ title: 'Is Svelte 5 good?', content: 'YES!', value: 'is-svelte5-good' }
	];
</script>

<Accordion class="w-full max-w-[700px]" value="what-is-lithesome">
	{#each items as { title, content, value }}
		<AccordionItem {value} class="border-b border-neutral-300 last:border-none dark:border-white/10">
			<AccordionHeading>
				<AccordionButton
					class="flex w-full cursor-pointer items-center justify-between gap-4 p-4 hover:text-black dark:hover:text-white"
				>
					{#snippet children({ active })}
						{title}
						<ChevronRightIcon class={cn('h-6 w-6 transition-transform', active ? 'rotate-90' : '')} />
					{/snippet}
				</AccordionButton>
			</AccordionHeading>
			<AccordionContent>
				{#snippet custom({ props, state })}
					{#if state.active}
						<div transition:slide={{ duration: 150 }} {...props} class="px-4 pb-4 text-sm">{content}</div>
					{/if}
				{/snippet}
			</AccordionContent>
		</AccordionItem>
	{/each}
</Accordion>
