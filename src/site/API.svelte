<script lang="ts">
	import type { APIReference } from '$site/types.js';

	interface Props {
		data: APIReference[];
	}

	let { data }: Props = $props();
</script>

<h2>API Reference</h2>

<div class="flex flex-col gap-12">
	{#each data as a}
		<div>
			<h3
				class="inline-block rounded-md border border-black/15 bg-black/5 px-4 py-1 font-mono text-black dark:border-white/10 dark:bg-white/5 dark:text-white"
			>
				{a.name}
			</h3>
			{#if a.description}
				<p>{a.description}</p>
			{/if}
			{#if a.childOf}
				<blockquote class="text-xs">This component is a child of <code>{a.childOf}</code></blockquote>
			{/if}
			{#if a.props}
				<table>
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each a.props as p}
							<tr>
								<td>
									<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">{p.name}</code>
									{#if p.required}
										<span class="text-red-500">*</span>
									{/if}
								</td>
								<td>
									<code>{p.type}</code>
									<br />
									<br />
									<code>Default: {p.default}</code>
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
			{/if}
			{#if a.childrenProps}
				<table>
					<thead>
						<tr>
							<th>Child prop</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each a.childrenProps as c}
							<tr>
								<td>
									<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">{c.name}</code>
								</td>
								<td>
									<code>{c.type}</code>
								</td>
								<td>
									{#if c.description}
										{@html c.description}
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
			<table>
				<thead>
					<tr>
						<th>Data attribute</th>
						<th>Value</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">data-{a.name.toLowerCase()}</code>
						</td>
						<td>
							<code>''</code>
						</td>
						<td>The base data attribute, can be used for styling.</td>
					</tr>
					{#each a.dataAttrs || [] as d}
						<tr>
							<td>
								<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">data-{d.name}</code>
							</td>
							<td>
								<code>{d.value}</code>
							</td>
							<td>
								{#if d.description}
									{@html d.description}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if a.events}
				<table>
					<thead>
						<tr>
							<th>Event</th>
							<th>Param & Return</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each a.events as e}
							<tr>
								<td>
									<code class="rounded-md bg-black/10 px-2 py-1 dark:bg-white/10">{e.name}</code>
								</td>
								<td>
									{#each e.params as param}
										<code>{param}</code>
									{/each}
									<br />
									<br />
									<code>{e.return}</code>
								</td>
								<td>
									{#if e.description}
										{@html e.description}
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	{/each}
</div>
