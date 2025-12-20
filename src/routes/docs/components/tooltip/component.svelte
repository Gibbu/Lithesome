<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '$lib/index.js';
	import { Button } from '$site/index.js';
</script>

<Tooltip
	floatingConfig={{
		offset: 15,
		placement: 'top'
	}}
>
	<TooltipTrigger>
		{#snippet custom({ props })}
			<Button variant="primary" {...props}>Hover me</Button>
		{/snippet}
	</TooltipTrigger>

	<TooltipContent>
		{#snippet custom({ props, state })}
			{#if state.visible}
				<div
					transition:fly={{ duration: 150, y: 5 }}
					{...props}
					class="rounded-md bg-white px-3 py-1.5 text-sm text-black shadow-md dark:bg-zinc-800 dark:text-white"
				>
					<TooltipArrow class="size-3 rotate-45 bg-white dark:bg-zinc-800" />
					Howdy!
				</div>
			{/if}
		{/snippet}
	</TooltipContent>
</Tooltip>
