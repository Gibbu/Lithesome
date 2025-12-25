<script lang="ts">
	import { outside } from '$lib/index.js';
	import { Container } from '$site/index.js';

	let count = $state<number>(0);
	let otherElement = $state<HTMLElement>();

	const increment = () => {
		count++;
	};
</script>

<div class="flex flex-col justify-center gap-8">
	<Container
		containerClass="w-[450px]"
		bodyClass="text-center select-none"
		{@attach outside(increment, { exclude: [otherElement] })}
	>
		<span>Clicked {count} time{count !== 1 ? 's' : ''}</span>
	</Container>

	<Container containerClass="w-[450px]" bodyClass="text-center select-none" bind:ref={otherElement}>
		<span> Don't run on this element. </span>
	</Container>
</div>
