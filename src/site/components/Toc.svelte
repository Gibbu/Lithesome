<script lang="ts">
	import { onMount } from 'svelte';

	let tocItems = $state<{ text: string; id: string; level: number }[]>([]);
	let active = $state<string | null>(null);

	onMount(() => {
		const root = document.querySelector('.toc-target')!;
		const items = root.querySelectorAll('h2, h3');

		items.forEach((item) => {
			tocItems.push({
				text: item.textContent,
				id: item.id,
				level: parseInt(item.tagName.replace('H', '')) - 1
			});
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						active = entry.target.id;
					}
				});
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);

		items.forEach((item) => observer.observe(item));

		return () => {
			observer.disconnect();
		};
	});
</script>

{#each tocItems as item}
	<a
		href="#{item.id}"
		class={[
			'relative mb-2 block text-sm',
			active === item.id ? 'text-teal-500' : 'hover:text-black dark:hover:text-white',
			item.level === 2 && 'pl-4'
		]}
	>
		{#if active === item.id}
			<span class="absolute -left-6 h-full w-px -translate-x-px bg-teal-500"></span>
		{/if}
		{item.text}
	</a>
{/each}
