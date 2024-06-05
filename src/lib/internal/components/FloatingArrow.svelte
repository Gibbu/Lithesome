<script lang="ts">
	import { onMount } from 'svelte';
	import { useActions, classProp, log, FloatingContext, type PropsNoChildren } from '$internal';

	interface ComponentProps extends PropsNoChildren<HTMLDivElement> {
		component: string;
		ctx: FloatingContext;
		state?: Record<string, any>;
	}

	let {
		class: klass,
		use = [],
		self = $bindable(),
		state = $bindable(),
		ctx,
		component,
		...props
	}: ComponentProps = $props();

	const dataProps = {
		[`data-${component.toLowerCase()}arrow`]: ''
	};

	onMount(() => {
		if (!ctx) throw log.error(`<${component}Arrow /> must be a child of <${component}Content />`);
		if (!self) throw log.error(`Cannot initialize arrow node of <${component}Arrow />.`);
		ctx.arrow = self;
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, state)} {...dataProps} {...props}></div>
