<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Meta from '$site/Meta.svelte';
	import NProgress from 'nprogress';
	import '../app.pcss';

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
	});
</script>

<Meta />

<div class="relative flex min-h-screen flex-col">
	<div class="pointer-events-none -z-10 flex select-none flex-col items-center">
		<div
			style="background-image: url('/background.png'); mask: radial-gradient(black, transparent);"
			class="fixed inset-0"
		/>
		<div
			class="fixed h-[750px] w-[250px] -translate-x-56 rotate-12 scale-150 bg-gradient-to-t from-transparent to-violet-500 to-70% opacity-25 blur-[120px]"
		/>
		<div
			class="fixed left-24 h-[750px] w-[250px] rotate-[-42deg] scale-150 bg-gradient-to-t from-transparent to-blue-500 to-70% opacity-10 blur-[120px]"
		/>
		<div
			class="fixed h-[750px] w-[250px] translate-x-24 rotate-[32deg] scale-150 bg-gradient-to-t from-transparent to-blue-500 opacity-30 blur-[120px]"
		/>
		<div
			class="fixed -right-24 h-[750px] w-[250px] rotate-[-32deg] scale-150 bg-gradient-to-t from-transparent to-violet-500 opacity-15 blur-[120px]"
		/>
	</div>
	<div class="flex flex-1 flex-col">
		<slot />
	</div>
	<footer class="group border-t border-white/10 py-8 text-xs">
		<div class="wrap flex items-start justify-between">
			<p class="opacity-50 group-hover:opacity-100">
				Lithesome made by <a
					href="https://gibbu.me"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500 underline">Gibbu</a
				>
			</p>
		</div>
	</footer>
</div>
