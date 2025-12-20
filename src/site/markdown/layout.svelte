<script lang="ts" module>
	import CodeBlock from '$site/markdown/CodeBlock.svelte';

	export { CodeBlock };
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}
