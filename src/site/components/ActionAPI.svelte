<script lang="ts">
	import type { ActionReference } from '$site/index.js';
	import type { Props } from '$internal';

	interface ComponentProps {
		data: ActionReference;
	}

	let { data }: ComponentProps = $props();
</script>

<h2>API Reference</h2>

<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each data as p}
			<tr>
				<td>
					<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">{p.name}</code>
					{#if p.required}
						<span class="text-red-500">*</span>
					{/if}
				</td>
				<td>
					<code>{p.type}</code>
					{#if p.default}
						<br />
						<br />
						<code>Default: {p.default}</code>
					{/if}
				</td>
				<td>
					{#if p.description}
						{@html p.description}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
