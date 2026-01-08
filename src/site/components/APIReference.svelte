<script lang="ts">
	import { Tooltip } from '$site/index.js';

	import type { ComponentReference } from '$site/types.js';

	let { ref }: { ref: Record<string, ComponentReference> } = $props();
</script>

<h2 id="api-reference">API Reference</h2>

{#each Object.entries(ref) as [comp, api]}
	<h3 id="api-ref-{comp.toLowerCase()}">
		<span class="api-ref-code">&lt;{comp} /&gt;</span>
	</h3>
	{#if api.props.length || api.state.length}
		{#if api.props.length > 0}
			<table>
				<thead>
					<tr>
						<th class="w-1/5">Property</th>
						<th class="w-1/3">Type</th>
						<th class="w-1/3">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each api.props as prop}
						<tr>
							<td class="w-1/5">
								<code class="api-ref-code">{prop.name}</code>
								{#if prop.bindable}
									<Tooltip type="bindable">
										This value can be 2 way bound, using the <code class="api-ref-code">bind:{prop.name}</code> syntax.
									</Tooltip>
								{/if}
								{#if prop.required}
									<Tooltip type="required">This value is required to function properly.</Tooltip>
								{/if}
							</td>
							<td class="w-1/3">{prop.type}</td>
							<td class="w-1/3"><p class="whitespace-pre-line">{prop.comment}</p></td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		{#if api.state.length > 0}
			<table>
				<thead>
					<tr>
						<th class="w-1/5">State</th>
						<th class="w-1/3">Type</th>
						<th class="w-1/3">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each api.state as state}
						<tr>
							<td class="w-1/5">
								<code class="api-ref-code">{state.name}</code>
							</td>
							<td class="w-1/3">{state.type}</td>
							<td class="w-1/3">{state.comment}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	{:else}
		<p>This component has no notable props or state.</p>
	{/if}
{/each}
