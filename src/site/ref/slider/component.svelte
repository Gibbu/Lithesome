<script lang="ts">
	import { Slider, SliderRange, SliderThumb } from '$lib/index.js';
</script>

<Slider class="relative flex h-4 w-96 cursor-pointer items-center rounded-full bg-neutral-300 dark:bg-neutral-800">
	<SliderRange class="h-full rounded-full bg-black dark:bg-white" />
	<SliderThumb
		class="size-6 cursor-pointer rounded-full border border-transparent bg-white shadow-md dark:border-black"
	/>
</Slider>
