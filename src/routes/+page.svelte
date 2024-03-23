<script lang="ts">
	import { Button, cn, copy } from '$site/index.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Copy, Check } from '@steeze-ui/lucide-icons';
	import { version } from '$app/environment';

	let copied = $state(false);
	const copySuccess = () => {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

<div class="relative flex h-[500px] flex-col items-center justify-center text-center">
	<div
		class={cn(
			'rounded-full border   px-8 py-1 text-xs  backdrop-blur',
			'border-teal-300 bg-teal-400/20 text-teal-500',
			'dark:border-teal-400/50 dark:bg-teal-400/10 dark:text-teal-400'
		)}
	>
		v{version}
	</div>
	<h1 class="text-800 mb-2 text-8xl font-semibold tracking-wider dark:text-white">Lithesome</h1>
	<h3 class="text-2xl text-neutral-600 dark:text-neutral-300">An unstyled component library for Svelte 5.</h3>
	<div class="mt-10 flex items-center gap-4">
		<Button variant="primary" size="lg" href="/docs">Get Started</Button>
		<Button variant="secondary" size="lg" use={[[copy, { on: 'click', onSuccess: copySuccess }]]}>
			npm install -D lithesome
			<Icon src={copied ? Check : Copy} class="h-5 w-5" />
		</Button>
	</div>
</div>
