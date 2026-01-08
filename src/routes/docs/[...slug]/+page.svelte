<script lang="ts">
	import { APIReference, CodePreview } from '$site/index.js';

	let { data } = $props();
</script>

{#if data.previewCode && data.previewComponent}
	<CodePreview code={data.previewCode} Comp={data.previewComponent} />
{/if}

<data.component />

{#if data.componentReference}
	<APIReference ref={data.componentReference} />
{/if}
