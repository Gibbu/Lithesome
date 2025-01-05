<script lang="ts">
	import { Slider, SliderRange, SliderThumb } from '$lib/index.js';

	let value = $state(50);
</script>

<Slider
	bind:value
	class="relative flex h-4 w-96 cursor-pointer items-center rounded-full bg-neutral-300 dark:bg-neutral-800"
	step={5}
>
	<SliderRange class="h-full rounded-full bg-black dark:bg-white" />
	<SliderThumb
		class="size-6 cursor-pointer rounded-full border border-transparent bg-white shadow-md dark:border-black"
	/>
</Slider>

<span class="absolute bottom-2 right-2 opacity-50">{value}</span>
