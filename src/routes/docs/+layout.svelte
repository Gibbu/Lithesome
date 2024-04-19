<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Button, cn, isMobile, Banner } from '$site/index.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Github, Menu, Moon, Sun } from '@steeze-ui/lucide-icons';
	import { disableScroll, isBrowser } from '$lib/internal/index.js';
	import { afterNavigate } from '$app/navigation';

	let { data, children } = $props();

	let navLinkClass = 'flex items-center rounded-md px-3.5 py-2 text-sm font-semibold mb-1 border border-transparent';
	let navLinkActive =
		'bg-white text-black border-white shadow-md dark:bg-neutral-900 dark:text-white dark:border-neutral-800 dark:shadow-none';
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

{#snippet badge(type: 'soon' | 'updated' | 'new')}
	<div
		class={cn(
			'rounded-xl px-2.5 py-0.5 text-xs capitalize',
			type === 'soon' ? 'bg-gray-500/20 text-gray-400' : '',
			type === 'updated' ? 'bg-blue-500/20 text-blue-400 dark:bg-blue-500/20 dark:text-blue-300' : '',
			type === 'new' ? 'bg-emerald-500/20 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-300' : ''
		)}
	>
		{type}
	</div>
{/snippet}

<nav class="h-[var(--nav-height)]">
	<div class="wrap flex h-full items-center justify-between">
		<div class="flex items-center">
			{#if isMobile}
				<Button variant="text" onclick={() => (mobileSidebar = !mobileSidebar)}>
					<Icon src={Menu} class="size-5 text-black dark:text-white" />
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
			<a
				href="https://github.com/Gibbu/Lithesome"
				target="_blank"
				rel="noopener noreferrer"
				class="flex-centre h-12 w-12 rounded-xl hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
			>
				<Icon src={Github} class="h-6 w-6" />
			</a>
			<button
				type="button"
				onclick={changeTheme}
				class="flex-centre h-12 w-12 rounded-xl hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
			>
				<Icon src={theme === 'dark' ? Sun : Moon} class="h-6 w-6" />
			</button>
		</div>
	</div>
</nav>

<div class="wrap items-start md:grid md:grid-cols-[190px,1fr] md:gap-6">
	<aside
		class={cn(
			'sticky top-8 overflow-auto pb-8',
			'mb-6 h-[calc(100vh-var(--nav-height)-24px)] md:mb-0 md:h-[calc(100vh-var(--nav-height))]',
			mobileSidebar ? 'block' : 'hidden md:block'
		)}
	>
		<ul class="h-full">
			{#each data.routes as route}
				<li>
					{#if route.title}
						<a
							href="/docs{route.path === '/' ? '' : '/' + route.path}"
							class={cn(
								navLinkClass,
								active(route.path) ? navLinkActive : 'hover:bg-neutral-400/10 dark:hover:bg-white/5'
							)}
						>
							<span class="flex-1">{route.title}</span>
							{#if route.badge}
								{@render badge(route.badge)}
							{/if}
						</a>
					{/if}

					{#if route.folder}
						<h3 class="ml-3.5 mt-8 text-xs font-bold uppercase text-neutral-400 dark:text-neutral-500">
							{route.folder}
						</h3>
						<ul class="mt-2">
							{#each route.children as subRoute}
								<li>
									<a
										href="/docs{subRoute.path === '/' ? '' : '/' + subRoute.path}"
										class={cn(
											navLinkClass,
											active(subRoute.path) ? navLinkActive : 'hover:bg-neutral-400/10 dark:hover:bg-white/5'
										)}
									>
										<span class="flex-1">{subRoute.title}</span>
										{@render badge(subRoute.badge)}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</aside>
	<main
		class={cn(
			'min-h-[calc(100vh-var(--nav-height))] w-full min-w-0 rounded-tl-xl rounded-tr-xl bg-white p-8 shadow-xl md:p-12 md:pb-24',
			'dark:highlight dark:bg-neutral-920/70'
		)}
	>
		{#if !hideEarlyDev}
			<Banner type="warning" dismissable class="mb-8" onClick={hideBanner}>
				This package and docs are still under very early development. Expect things to be broken.
			</Banner>
		{/if}
		{@render children()}
	</main>
</div>
