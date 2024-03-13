<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Banner from '$site/Banner.svelte';
	import { cn } from '$site/index.js';
	let { data } = $props();

	let navLinkClass = 'flex items-center rounded-md px-6 py-2.5 text-sm font-medium mb-1';
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

<nav class="fixed left-0 top-0 z-10 h-[64px] w-full border-b border-white/10 bg-black/35 backdrop-blur"></nav>

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
							{route.title}
							{#if active(route.path)}
								{@render pill()}
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
										{subRoute.title}
										{#if active(subRoute.path)}
											{@render pill()}
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
