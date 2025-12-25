<script lang="ts">
	import { outside, trap } from '$lib/index.js';
	import { Button, Container } from '$site/index.js';

	let visible = $state<boolean>(false);
	let button = $state<HTMLButtonElement | HTMLAnchorElement>();

	const close = () => {
		visible = false;
	};
</script>

<div class="relative">
	<Button bind:ref={button} variant="secondary" onclick={() => (visible = !visible)}>Click me</Button>

	{#if visible}
		<Container
			containerClass="absolute left-1/2 -translate-x-1/2 w-[250px]"
			bodyClass="flex flex-col items-center gap-4"
			{@attach trap({ allowOutsideClick: true })}
			{@attach outside(close, { exclude: [button] })}
		>
			<input
				type="text"
				class={[
					'w-full border border-zinc-400 px-4 py-3 dark:border-zinc-800',
					'hover:border-zinc-600 dark:hover:border-zinc-700',
					'focus:border-teal-500 focus:outline-none dark:focus:border-teal-500',
					'text-black dark:text-zinc-200'
				]}
				placeholder="Type stuff..."
			/>
			<Button variant="secondary" onclick={close}>Close</Button>
		</Container>
	{/if}
</div>
