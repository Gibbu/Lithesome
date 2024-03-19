<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Banner from '$site/Banner.svelte';
	import { cn } from '$site/index.js';
	import { Github } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let { data } = $props();

	let navLinkClass = 'flex items-center rounded-md pl-6 pr-2.5 py-2.5 text-sm font-medium mb-1';
	let navLinkActive = 'bg-white/10 text-white';

	const active = (route: string) => {
		if (!route || (route === '/' && $page.url.pathname === '/docs')) return true;
		else if (route === $page.url.pathname.replace('/docs/', '')) return true;
		else return false;
	};
	let hideEarlyDev = $state(browser ? localStorage.getItem('earlyDev') : true);
	const hideBanner = () => {
		localStorage.setItem('earlyDev', 'true');
		hideEarlyDev = true;
	};
</script>

{#snippet pill()}
	<div class="absolute left-0 h-5 w-1 rounded-full bg-violet-500" />
{/snippet}
{#snippet badge(type: 'soon' | 'updated' | 'new')}
	<div
		class={cn(
			'rounded-xl px-3 py-1 text-xs capitalize',
			type === 'soon' ? 'bg-amber-500/20 text-amber-300' : '',
			type === 'updated' ? 'bg-blue-500/20 text-blue-300' : '',
			type === 'new' ? 'bg-emerald-500/20 text-emerald-300' : ''
		)}
	>
		{type}
	</div>
{/snippet}

<nav class="fixed left-0 top-0 z-10 h-[64px] w-full border-b border-white/10 bg-black/35 backdrop-blur">
	<div class="wrap flex h-full items-center justify-between">
		<div class="flex items-center gap-4">
			<a href="/" class="text-xl font-semibold tracking-widest text-neutral-300 hover:text-white">
				<span class="font-black text-white">L</span>ithesome
			</a>
			<a href="/docs" class="ml-4 text-sm font-semibold hover:text-white">Docs</a>
		</div>
		<div class="flex items-center">
			<a
				href="https://github.com/Gibbu/Lithesome"
				target="_blank"
				rel="noopener noreferrer"
				class="flex-centre h-12 w-12 rounded-xl hover:bg-white/10 hover:text-white"
			>
				<Icon src={Github} class="h-6 w-6" />
			</a>
		</div>
	</div>
</nav>

<div class="wrap mt-[64px] grid h-full grid-cols-[220px,1fr] items-start gap-16">
	<aside class="sticky top-4 h-[calc(100vh-64px)] py-16">
		<ul class="h-full">
			{#each data.routes as route}
				<li>
					{#if route.title}
						<a
							href="/docs{route.path === '/' ? '' : '/' + route.path}"
							class={cn(navLinkClass, active(route.path) ? navLinkActive : 'hover:bg-white/5')}
						>
							<span class="flex-1">{route.title}</span>
							{#if active(route.path)}
								{@render pill()}
							{/if}
							{#if route.badge}
								{@render badge(route.badge)}
							{/if}
						</a>
					{/if}

					{#if route.folder}
						<h3 class="ml-3.5 mt-8 text-xs font-bold uppercase text-neutral-500">{route.folder}</h3>
						<ul class="mt-2">
							{#each route.children as subRoute}
								<li>
									<a
										href="/docs{subRoute.path === '/' ? '' : '/' + subRoute.path}"
										class={cn(navLinkClass, active(subRoute.path) ? navLinkActive : 'hover:bg-white/5')}
									>
										<span class="flex-1">{subRoute.title}</span>
										{#if active(subRoute.path)}
											{@render pill()}
										{/if}
										{#if subRoute.badge}
											{@render badge(subRoute.badge)}
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</aside>
	<article class="py-16">
		{#if !hideEarlyDev}
			<Banner type="warning" dismissable class="mb-8" onClick={hideBanner}>
				This package and docs are still under very early development. Expect things to be broken.
			</Banner>
		{/if}
		<slot />
	</article>
</div>
