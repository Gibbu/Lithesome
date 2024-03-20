<script lang="ts">
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/index.js';
	import { Button, Input } from '$site/index.js';
	import { scale } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { HelpCircle, BookTemplate, KeyRound } from '@steeze-ui/lucide-icons';

	let visible = $state(false);

	const items = [
		{
			name: 'Information',
			children: [
				{ title: 'Help Centre', text: 'Check out our FAQs or ask a real human!', icon: HelpCircle },
				{ title: 'Templates', text: 'Setup your app in an instant!', icon: BookTemplate }
			]
		},
		{
			name: 'Tools',
			children: [{ title: 'Token Generator', text: 'Whip up a quick token to use in your next app.', icon: KeyRound }]
		}
	];
</script>

<Popover bind:visible>
	<PopoverTrigger>
		<Button variant="primary">Resources</Button>
	</PopoverTrigger>
	<PopoverContent
		class="w-[450px] origin-top translate-y-2 rounded-xl border border-white/20 bg-black/50 p-4 shadow-xl backdrop-blur"
		transition={[scale, { start: 0.9, duration: 150 }]}
	>
		{#each items as { name, children }}
			<div class="mb-4 border-b border-white/10 pb-4 last:mb-0 last:border-b-0 last:pb-0">
				<h4 class="mb-2 text-xs font-semibold uppercase text-neutral-500">{name}</h4>
				{#each children as tool}
					<button
						type="button"
						class="focusOutline flex w-full items-center gap-4 rounded-md p-4 text-left hover:bg-white/5"
						onclick={() => (visible = false)}
					>
						<Icon src={tool.icon} class="h-8 w-8" />
						<div>
							<p class="font-semibold text-white">{tool.title}</p>
							<p class="text-sm text-neutral-400">{tool.text}</p>
						</div>
					</button>
				{/each}
			</div>
		{/each}
	</PopoverContent>
</Popover>
