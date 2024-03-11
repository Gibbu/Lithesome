<script lang="ts">
	import { Button, copy } from '$site/index.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Copy, Check } from '@steeze-ui/lucide-icons';

	let copied = $state(false);
	const copySuccess = () => {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

<div class="relative flex h-[500px] flex-col items-center justify-center text-center">
	<h1 class="mb-2 text-8xl font-semibold tracking-wider text-white">Lithesome</h1>
	<h3 class="text-2xl text-neutral-300">An unstyled component library for Svelte 5.</h3>
	<div class="mt-10 flex items-center gap-4">
		<Button variant="primary" size="lg" href="/docs">Get Started</Button>
		<button
			type="button"
			use:copy={{ on: 'click', onSuccess: copySuccess }}
			class="flex items-center gap-3 rounded-lg border border-white/20 bg-black/15 px-6 py-3.5 text-white hover:bg-white hover:text-black"
		>
			npm install -D lithesome
			<Icon src={copied ? Check : Copy} class="h-5 w-5" />
		</button>
	</div>
</div>
