<script lang="ts">
	import { Frame } from '$site/index.js';

	let { children } = $props();
</script>

<Frame>
	<p>{@render children()}</p>
</Frame>
