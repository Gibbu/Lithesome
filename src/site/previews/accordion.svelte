<script lang="ts">
	import { Accordion, AccordionButton, AccordionContent, AccordionHeading, AccordionItem } from '$lib/index.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/lucide-icons';
	import { cn } from '$site/index.js';
	import { slide } from 'svelte/transition';

	const items = [
		{
			title: 'What is Lithesome?',
			content:
				'Lithesome is a collection of unstyled Svelte 5 components that take care of all the functionality, leaving the visual design to you.'
		},
		{ title: 'Is it good?', content: 'Well... Maybe... Idk...' },
		{ title: 'Is Svelte 5 good?', content: 'YES!' }
	];
</script>

<Accordion
	single
	class="w-full max-w-[70%] rounded-md border border-neutral-300 bg-white dark:border-white/10 dark:bg-white/5"
>
	{#each items as { title, content }}
		<AccordionItem class="border-b border-neutral-300 last:border-none dark:border-white/10">
			<AccordionHeading>
				<AccordionButton
					class="flex w-full items-center justify-between gap-4 p-4 hover:bg-black/[0.03] dark:hover:bg-white/5"
				>
					{#snippet children({ active })}
						{title}
						<Icon src={ChevronDown} class={cn('h-6 w-6 transition-transform', active ? 'rotate-180' : '')} />
					{/snippet}
				</AccordionButton>
			</AccordionHeading>
			<AccordionContent transition={[slide, { duration: 150 }]} class="p-4">{content}</AccordionContent>
		</AccordionItem>
	{/each}
</Accordion>
