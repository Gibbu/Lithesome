<script lang="ts">
	import { Button, cn, copy } from '$site/index.js';
	import { CheckIcon, CopyIcon } from 'lucide-svelte';
	import { version } from '$app/environment';

	let copied = $state(false);
	const copySuccess = () => {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};

	const Icon = $derived(copied ? CheckIcon : CopyIcon);
</script>

<div class="relative flex h-[500px] flex-col items-center justify-center text-center">
	<div
		class={cn(
			'rounded-full border px-8 py-1 text-xs backdrop-blur',
			'border-teal-300 bg-teal-400/20 text-teal-500',
			'dark:border-teal-400/50 dark:bg-teal-400/10 dark:text-teal-400'
		)}
	>
		v{version}
	</div>
	<h1 class="text-800 mb-2 text-6xl font-semibold tracking-wider dark:text-white md:text-8xl">Lithesome</h1>
	<h3 class="text-lg text-neutral-600 dark:text-neutral-300 md:text-2xl">
		An unstyled component library for Svelte 5.
	</h3>
	<div class="mt-10 flex flex-col items-center gap-4 md:flex-row">
		<Button variant="primary" size="lg" href="/docs" class="w-full md:w-auto">Get Started</Button>
		<Button variant="secondary" size="lg" use={[[copy, { on: 'click', onSuccess: copySuccess }]]}>
			npm install -D lithesome
			<Icon />
		</Button>
	</div>
</div>
