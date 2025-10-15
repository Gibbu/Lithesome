<script lang="ts">
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { ModeWatcher } from 'mode-watcher';

	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />
<ProgressBar class="text-teal-500" />

{@render children()}
