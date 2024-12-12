<script lang="ts">
	import { Tree, TreeItem, TreeGroup, TreeButton } from '$lib/index.js';
	import { cn } from '$site/utils.js';

	interface TreeData {
		id: string;
		label: string;
		children?: TreeData[];
	}

	const data: TreeData[] = [
		{
			id: 'src',
			label: 'src',
			children: [
				{
					id: 'lib',
					label: 'lib',
					children: [
						{
							id: 'components',
							label: 'components',
							children: [
								{ id: 'accordion', label: 'Accordion', children: [{ id: 'accordion-main', label: 'main.svelte.ts' }] }
							]
						},
						{
							id: 'actions',
							label: 'actions',
							children: [
								{ id: 'useoutside', label: 'useOutside.ts' },
								{ id: 'useportal', label: 'usePortal.ts' },
								{ id: 'usetrap', label: 'useTrap.ts' }
							]
						}
					]
				},
				{
					id: 'routes',
					label: 'routes',
					children: [
						{ id: 'page', label: '+page.svelte' },
						{ id: 'layout', label: '+layout.svelte' },
						{ id: 'page-server', label: '+page.server.ts' }
					]
				}
			]
		},
		{ id: 'vite', label: 'vite.config.js' },
		{ id: 'svelte-config', label: 'svelte.config.js' }
	];
</script>

{#snippet buildTree(items: TreeData[])}
	{#each items as { id, label, children }}
		<TreeItem {id}>
			<TreeButton
				class={({ selected }) => cn('rounded-md px-3 py-1 text-sm', selected ? 'bg-teal-500/20 text-teal-300' : '')}
			>
				{label}
			</TreeButton>
			{#if children}
				<TreeGroup class="border-l-2 border-teal-500/20 pl-2">
					{@render buildTree(children)}
				</TreeGroup>
			{/if}
		</TreeItem>
	{/each}
{/snippet}

<Tree>
	{@render buildTree(data)}
</Tree>
