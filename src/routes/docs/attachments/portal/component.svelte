<script lang="ts">
	import { portal } from '$lib/index.js';
	import { Button, Container } from '$site/index.js';

	let from = $state<HTMLElement>();
	let to = $state<HTMLElement>();

	let toggle = $state(false);
</script>

<div class="flex flex-col justify-center gap-4">
	<Button variant="secondary" onclick={() => (toggle = !toggle)}>Toggle portal</Button>

	<div class="flex gap-4">
		<Container bind:ref={from}>
			Container 1
			<div {@attach portal(toggle ? to : from)}>Portal content</div>
		</Container>

		<Container bind:ref={to}>Container 2</Container>
	</div>
</div>
