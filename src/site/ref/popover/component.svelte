<script lang="ts">
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { scale } from 'svelte/transition';
	import { HelpCircleIcon, BookTemplateIcon, KeyRoundIcon } from 'lucide-svelte';

	let visible = $state(false);

	const items = [
		{
			name: 'Information',
			children: [
				{ title: 'Help Centre', text: 'Check out our FAQs or ask a real human!', icon: HelpCircleIcon },
				{ title: 'Templates', text: 'Setup your app in an instant!', icon: BookTemplateIcon }
			]
		},
		{
			name: 'Tools',
			children: [
				{ title: 'Token Generator', text: 'Whip up a quick token to use in your next app.', icon: KeyRoundIcon }
			]
		}
	];
</script>

<Popover bind:visible>
	<PopoverTrigger>
		<Button variant="primary">Resources</Button>
	</PopoverTrigger>

	<PopoverContent
		class={cn(
			'w-[450px] origin-top translate-y-1 rounded-xl border p-4 shadow-xl backdrop-blur ',
			'border-neutral-300 bg-white shadow-neutral-200',
			'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
		)}
		transition={[scale, { start: 0.9, duration: 150 }]}
	>
		{#each items as { name, children }}
			<div class="mb-4 border-b border-neutral-200 pb-4 last:mb-0 last:border-b-0 last:pb-0 dark:border-white/10">
				<h4 class="mb-2 text-xs font-semibold uppercase text-neutral-500">{name}</h4>
				{#each children as tool}
					<button
						type="button"
						class="focusOutline flex w-full items-center gap-4 rounded-md p-4 text-left hover:bg-black/[0.035] dark:hover:bg-white/5"
						onclick={() => (visible = false)}
					>
						<svelte:component this={tool.icon} class="h-8 w-8" />
						<div>
							<p class="font-semibold text-neutral-800 dark:text-white">{tool.title}</p>
							<p class="text-sm text-neutral-500 dark:text-neutral-400">{tool.text}</p>
						</div>
					</button>
				{/each}
			</div>
		{/each}
	</PopoverContent>
</Popover>
