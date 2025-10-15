<script lang="ts">
	import { MoonIcon, PenIcon, SunIcon } from '@lucide/svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { page } from '$app/state';
	import { Button, Container, Toc } from '$site/index.js';

	let { children, data } = $props();

	const currentPage = $derived(data.groups.flatMap((group) => group.items).find((item) => item.href === page.route.id));
</script>

<Container containerClass="mb-6" bodyClass="flex justify-between items-center">
	<h2 class="text-2xl text-zinc-900 dark:text-zinc-100">
		<a href="/">Lithesome</a>
	</h2>
	<div class="flex items-center gap-4">
		<Button variant="text" onclick={() => toggleMode()}>
			{#if mode.current === 'light'}
				<SunIcon class="size-5" />
			{:else}
				<MoonIcon class="size-5" />
			{/if}
		</Button>
	</div>
</Container>

<div class="grid flex-1 grid-cols-[350px_1fr_300px] gap-6">
	<Container as="nav" containerClass="h-full" bodyClass="space-y-6">
		{#snippet header()}
			<h3>Navigation</h3>
		{/snippet}

		{#each data.groups as group, i}
			<section>
				<h4 class="mb-3 font-semibold capitalize dark:text-zinc-200">{group.name}</h4>
				{#each group.items as item}
					{@const active = page.route.id === item.href}
					<a
						href={item.href}
						class={[
							'relative -mx-6 flex items-center px-6 py-4 text-sm select-none',
							active
								? 'bg-zinc-200 text-black dark:bg-zinc-900 dark:text-white'
								: 'hover:bg-zinc-200 dark:hover:bg-zinc-920'
						]}
					>
						{#if active}
							<div class="pointer-events-none absolute -left-px h-full w-px bg-teal-600 dark:bg-teal-500"></div>
						{/if}
						{item.data.title}
					</a>
				{/each}
			</section>
			{#if data.groups.length - 1 !== i}
				<hr class="-mx-6 h-px border-zinc-400 dark:border-zinc-800" />
			{/if}
		{/each}
	</Container>

	<Container
		as="main"
		headerClass="flex justify-between items-start"
		containerClass="h-full flex flex-col"
		bodyClass="flex-1 max-w-full prose dark:prose-invert prose-headings:font-normal toc-target prose-h2:mt-16 prose-h3:mt-12"
	>
		{#snippet header()}
			<div>
				<h1 class="text-5xl text-black dark:text-white">{currentPage?.data.title}</h1>
				<p class="mt-2 text-zinc-600 dark:text-zinc-500">{currentPage?.data.description}</p>
			</div>

			<Button
				variant="text"
				href="https://github.com/Gibbu/Lithesome/blob/main/src/routes{currentPage?.href}/+page.svx"
				external
			>
				<PenIcon class="size-4" />
			</Button>
		{/snippet}

		{@render children()}
	</Container>

	<Container as="aside" bodyClass="sticky top-0">
		{#snippet header()}
			<h4>On this page</h4>
		{/snippet}

		{#key page.route}
			<Toc />
		{/key}
	</Container>
</div>
