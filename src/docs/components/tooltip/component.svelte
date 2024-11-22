<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { InfoIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

<Tooltip delay={[200, 0]}>
	<TooltipTrigger>
		<button class="flex size-12 rounded hover:bg-black/10 hover:text-black dark:hover:bg-white/5 dark:hover:text-white">
			<InfoIcon class="m-auto w-8" />
		</button>
	</TooltipTrigger>
	<TooltipContent
		transition={[fly, { y: 5, duration: 200 }]}
		offset={10}
		placement="top"
		class={cn(
			'origin-bottom rounded-md border p-2 text-sm shadow-md',
			'border-neutral-300 bg-white shadow-neutral-200',
			'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
		)}
	>
		<TooltipArrow
			class={cn(
				'absolute bottom-0 bg-white dark:bg-neutral-900',
				'size-2 rotate-45 border-b border-r border-neutral-300 dark:border-neutral-700'
			)}
		/>
		Tooltip Content!
	</TooltipContent>
</Tooltip>
