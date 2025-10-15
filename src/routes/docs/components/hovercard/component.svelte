<script lang="ts">
	import { BookIcon, StarIcon } from '@lucide/svelte';
	import { Hovercard, HovercardArrow, HovercardContent, HovercardTrigger } from '$lib/index.js';
	import { Container } from '$site/index.js';
</script>

<Hovercard floatingConfig={{ offset: 25, placement: 'top' }}>
	<HovercardTrigger>
		{#snippet custom({ attrs })}
			<a
				href="https://github.com/Gibbu"
				target="_blank"
				rel="noopener noreferrer"
				class="block size-12 overflow-hidden rounded-full border-2 border-black shadow-md shadow-black/30 dark:border-white"
				{...attrs}
			>
				<img src="https://github.com/Gibbu.png" alt="GitHub avatar" class="w-full" />
			</a>
		{/snippet}
	</HovercardTrigger>
	<HovercardContent>
		{#snippet custom({ attrs, state })}
			{#if state.visible}
				<Container absolute {...attrs} containerClass="w-[320px] origin-top translate-y-3 shadow-xl">
					<HovercardArrow
						class={[
							'size-3 rotate-45 border-r border-b',
							'border-zinc-400 bg-white',
							'dark:border-zinc-800 dark:bg-zinc-940'
						]}
					/>
					<header class="flex items-center gap-4">
						<img src="https://github.com/Gibbu.png" alt="GitHub avatar" class="block size-10 rounded-full" />
						<div>
							<h4 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Gibbu</h4>
							<p class="text-sm text-zinc-400 dark:text-zinc-500">Hobbyist web dev</p>
						</div>
					</header>
					<footer class="mt-4 flex items-center gap-4">
						<div class="flex items-center gap-2 text-sm">
							<BookIcon class="size-4" />
							16 Repositories
						</div>
						<div class="flex items-center gap-2 text-sm">
							<StarIcon class="size-4" />
							77 Stars
						</div>
					</footer>
				</Container>
			{/if}
		{/snippet}
	</HovercardContent>
</Hovercard>
