<script lang="ts">
	import { Slider, SliderRange, SliderThumb } from '$lib/index.js';
</script>

<Slider
	class="relative flex h-4 w-96 cursor-pointer items-center rounded-full bg-neutral-300 dark:bg-neutral-800"
	step={10}
>
	<SliderRange class={['h-full rounded-full bg-black dark:bg-white', 'w-(--slider-percentage)']} />
	<SliderThumb
		class={[
			'absolute size-6 cursor-pointer rounded-full border border-transparent bg-white shadow-md dark:border-black',
			'left-(--slider-percentage) -translate-x-1/2'
		]}
	/>
</Slider>
