<script lang="ts">
	import { Hovercard, HovercardTrigger, HovercardContent } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { Book, Star } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fly } from 'svelte/transition';
</script>

<Hovercard>
	<HovercardTrigger>
		<a
			href="https://github.com/Gibbu"
			target="_blank"
			rel="noopener noreferrer"
			class="block size-12 overflow-hidden rounded-full border-2 border-black shadow-md shadow-black/30 dark:border-white"
		>
			<img src="https://github.com/Gibbu.png" alt="GitHub avatar" class="w-full" />
		</a>
	</HovercardTrigger>
	<HovercardContent
		transition={[fly, { y: 5, duration: 200 }]}
		class={cn(
			'w-[300px] origin-top translate-y-3 rounded-xl border p-4 shadow-xl backdrop-blur ',
			'border-neutral-300 bg-white shadow-neutral-200',
			'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
		)}
	>
		<header class="flex items-center gap-4">
			<img src="https://github.com/Gibbu.png" alt="GitHub avatar" class="block size-10 rounded-full" />
			<div>
				<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Gibbu</h4>
				<p class="text-sm text-neutral-400 dark:text-neutral-500">Hobbyist web dev</p>
			</div>
		</header>
		<footer class="mt-4 flex items-center gap-4">
			<div class="flex items-center gap-2 text-sm">
				<Icon src={Book} class="size-4" />
				18 Repositories
			</div>
			<div class="flex items-center gap-2 text-sm">
				<Icon src={Star} class="size-4" />
				57 Stars
			</div>
		</footer>
	</HovercardContent>
</Hovercard>
