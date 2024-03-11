<script lang="ts">
	let { data } = $props();
</script>

<div class="wrap grid grid-cols-[250px,1fr] items-start gap-16">
	<aside class="sticky top-4">
		{#each data.routes as route}
			<a href="/docs{route.path === '/' ? '' : '/' + route.path}" class="flex">{route.title}</a>
		{/each}
	</aside>
	<article>
		<slot />
	</article>
</div>
