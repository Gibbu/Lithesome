<script lang="ts">
	import { Pin, PinInput } from '$lib/index.js';

	const filled = (value: string[]) => {
		console.log('Pin Input value:', value.join(''));
	};
</script>

<Pin class="flex items-center gap-6" onFilled={filled}>
	{#each { length: 6 }}
		<PinInput
			class={({ filled }) => [
				'h-20 w-16 border text-center text-2xl focus:outline-1',
				filled
					? 'border-teal-500 focus:border-teal-500 focus:outline-teal-500'
					: 'border-zinc-700 focus:border-zinc-400'
			]}
		/>
	{/each}
</Pin>
