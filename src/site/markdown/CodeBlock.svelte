<script lang="ts">
	import { CheckIcon, CopyIcon } from '@lucide/svelte';
	import Button from '$site/components/Button.svelte';
	import { Frame } from '$site/index.js';
	import { highlighter } from '../components/CodePreview.svelte';

	let copied = $state<boolean>(false);

	interface Props {
		code: string;
		lang: string;
	}

	let { code, lang }: Props = $props();
</script>

<Frame class="group">
	<Button
		variant="text"
		class="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100"
		onclick={async () => {
			copied = true;
			await navigator.clipboard.writeText(code.trim());
			setTimeout(() => (copied = false), 2000);
		}}
	>
		{#if copied}
			<CheckIcon class="size-4" />
		{:else}
			<CopyIcon class="size-4" />
		{/if}
	</Button>

	{@html highlighter(code, lang)}
</Frame>
