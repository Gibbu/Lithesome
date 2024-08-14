<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Button, cn, isMobile, Banner, type DocsPageMeta } from '$site/index.js';
	import { GithubIcon, MenuIcon, MoonIcon, SunIcon } from 'lucide-svelte';
	import { disableScroll, isBrowser } from '$internal';
	import { afterNavigate } from '$app/navigation';

	let { data, children } = $props();

	let theme = $state<'dark' | 'light'>(isBrowser ? localStorage.theme : 'light');
	let hideEarlyDev = $state(browser ? localStorage.getItem('earlyDev') : true);
	let mobileSidebar = $state<boolean>(!isMobile);

	const active = (route: string) => {
		if (!route || (route === '/' && $page.url.pathname === '/docs')) return true;
		else if (route === $page.url.pathname.replace('/docs/', '')) return true;
		else return false;
	};
	const hideBanner = () => {
		localStorage.setItem('earlyDev', 'true');
		hideEarlyDev = true;
	};
	const changeTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		if (theme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
	};

	$effect(() => {
		if (isMobile) {
			disableScroll(mobileSidebar && !document.body.style.overflow);
			if (mobileSidebar) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	});

	afterNavigate(() => {
		mobileSidebar = false;
	});
</script>

{#snippet link(route: DocsPageMeta)}
	<a
		href="/docs{route.path === '/' ? '' : '/' + route.path}"
		class={cn(
			'flex items-center rounded-md px-3.5 py-2 text-sm',
			active(route.path)
				? 'bg-neutral-100 font-semibold text-black dark:bg-neutral-900 dark:text-white dark:shadow-none'
				: 'hover:bg-neutral-50 dark:hover:bg-white/5'
		)}
	>
		<span class="flex-1">{route.title}</span>
		{#if route.badge}
			<div
				class={cn(
					'rounded-xl px-2.5 py-0.5 text-xs capitalize',
					route.badge === 'soon' ? 'bg-gray-500/20 text-gray-400' : '',
					route.badge === 'updated' ? 'bg-blue-500/20 text-blue-400 dark:bg-blue-500/20 dark:text-blue-300' : '',
					route.badge === 'new' ? 'bg-emerald-500/20 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-300' : ''
				)}
			>
				{route.badge}
			</div>
		{/if}
	</a>
{/snippet}

<nav
	class={cn(
		'fixed top-0 z-20 flex h-[var(--nav-height)] w-full items-center border-b backdrop-blur',
		'border-b-neutral-200 bg-white/50',
		'dark:border-b-neutral-900 dark:bg-neutral-950/80'
	)}
>
	<div class="wrap flex items-center justify-between">
		<div class="flex items-center">
			{#if isMobile}
				<Button variant="text" onclick={() => (mobileSidebar = !mobileSidebar)}>
					<MenuIcon class="size-5 text-black dark:text-white" />
				</Button>
			{/if}
			<a
				href="/"
				class="pl-3.5 text-xl font-semibold tracking-widest text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
			>
				<span class="font-black text-black dark:text-white">L</span>ithesome
			</a>
		</div>
		<div class="flex items-center">
			<Button variant="ghost" class="mr-4" href="/docs/changelog">Changelog</Button>
			<a
				href="https://github.com/Gibbu/Lithesome"
				target="_blank"
				rel="noopener noreferrer"
				class="flex-centre h-12 w-12 rounded-xl hover:bg-neutral-100 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
			>
				<GithubIcon class="size-6" />
			</a>
			<button
				type="button"
				onclick={changeTheme}
				class="flex-centre h-12 w-12 rounded-xl hover:bg-neutral-100 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
			>
				{#if theme === 'dark'}
					<SunIcon class="size-6" />
				{:else}
					<MoonIcon class="size-6" />
				{/if}
			</button>
		</div>
	</div>
</nav>

<div class="wrap grid items-start pt-[var(--nav-height)] md:grid-cols-[250px,1fr]">
	<aside class="sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] gap-4 overflow-y-auto py-4 pr-4">
		<ul class="flex h-full flex-col gap-2">
			{#each data.routes as route}
				{#if route.title}
					{@render link(route)}
				{/if}

				{#if route.folder}
					<h3 class="ml-3.5 mt-6 text-xs font-bold uppercase text-neutral-400 dark:text-neutral-500">
						{route.folder}
					</h3>
					<ul class="mt-1">
						{#each route.children as sub}
							<li class="mb-1 last:mb-4">
								{@render link(sub)}
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</ul>
	</aside>
	<main
		class="min-h-[calc(100vh-var(--nav-height))] min-w-0 border-l border-neutral-200 p-12 pr-0 dark:border-neutral-900"
	>
		{#if !hideEarlyDev}
			<Banner type="warning" dismissable class="mb-8" onClick={hideBanner}>
				This package and docs are still under very early development. Expect things to be broken.
			</Banner>
		{/if}
		{@render children()}
	</main>
</div>
