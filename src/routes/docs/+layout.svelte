<script lang="ts">
	import { ClockFadingIcon, MoonIcon, PenIcon, SunIcon } from '@lucide/svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Info from '$site/components/Info.svelte';
	import { Button, Container, Meta, Toc } from '$site/index.js';

	let { children, data } = $props();

	const groups = $derived(data.groups)!;

	const currentPage = $derived(groups.flatMap((group) => group.items).find((item) => item.path === page.url.pathname));
	let wipAlert = $derived(browser ? !localStorage.getItem('wipAlert') : false);

	$inspect(groups);
</script>

<Meta title={currentPage?.title} description={currentPage?.description} />

<Container containerClass="mb-6" bodyClass="flex justify-between items-center">
	<h2 class="text-2xl text-zinc-900 dark:text-zinc-100">
		<a href="/">Lithesome</a>
	</h2>
	<div class="flex items-center gap-4">
		<Button variant="text" href="/docs/changelog">
			<ClockFadingIcon class="size-5" />
		</Button>
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

		{#each groups as group, i}
			{#if group.name !== 'changelog'}
				<section>
					<h4 class="mb-3 font-semibold capitalize dark:text-zinc-200">{group.name}</h4>
					{#each group.items as item}
						{@const active = page.url.pathname === item.path}
						<a
							href={item.path}
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
							{item.title}
						</a>
					{/each}
				</section>
				{#if groups.length - 1 !== i}
					<hr class="-mx-6 h-px border-zinc-400 dark:border-zinc-800" />
				{/if}
			{/if}
		{/each}
	</Container>

	<Container
		as="main"
		headerClass="flex justify-between items-start"
		containerClass="h-full flex flex-col"
		bodyClass="flex-1 max-w-full prose dark:prose-invert prose-zinc toc-target prose-td:py-6"
	>
		{#snippet header()}
			<div>
				<h1 class="text-5xl text-black dark:text-white">{currentPage?.title}</h1>
				<p class="mt-2 text-zinc-600 dark:text-zinc-500">{currentPage?.description}</p>
			</div>

			<Button
				variant="text"
				href="https://github.com/Gibbu/Lithesome/blob/main/src/{currentPage?.path}/+page.svx"
				external
			>
				<PenIcon class="size-4" />
			</Button>
		{/snippet}

		{#if wipAlert}
			<Info
				type="warning"
				message="Lithesome has just gone under a massive rewrite, some components are gone, others have changed, and the docs are very barebones. Please bare with me."
				class="mb-6"
				dismissable
				onDismiss={() => {
					localStorage.setItem('wipAlert', 'true');
					wipAlert = false;
				}}
			/>
		{/if}
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
