<script lang="ts">
	import { CheckIcon, CopyIcon } from '@lucide/svelte';
	import { version } from '$app/environment';
	import { Button, cn, Container, copy } from '$site/index.js';

	let copied = $state(false);
	const copySuccess = () => {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};

	const Icon = $derived(copied ? CheckIcon : CopyIcon);
</script>

<Container bodyClass="items-center flex flex-col p-12">
	<div
		class={[
			'rounded-full border px-8 py-1 text-xs',
			'border-teal-300 bg-teal-400/20 text-teal-500',
			'dark:border-teal-400/50 dark:bg-teal-400/10 dark:text-teal-400'
		]}
	>
		v{version}
	</div>
	<h1 class="text-800 mb-2 text-6xl font-semibold tracking-wider md:text-8xl dark:text-white">Lithesome</h1>
	<h3 class="text-xl text-neutral-600 dark:text-neutral-300">An unstyled component library for Svelte 5.</h3>
	<div class="mt-16 flex flex-col items-center gap-4 md:flex-row">
		<Button variant="primary" size="lg" href="/docs/intro/getting-started" class="w-full md:w-auto">Get Started</Button>
		<Button variant="secondary" size="lg" {@attach copy({ onSuccess: copySuccess })}>
			npm install -D lithesome
			<Icon />
		</Button>
	</div>
</Container>
