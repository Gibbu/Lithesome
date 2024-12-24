<script lang="ts">
	import { Tree, TreeItem, TreeGroup, TreeButton } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { DotIcon } from 'lucide-svelte';

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
				class={({ hovered }) =>
					cn(
						'relative flex items-center rounded-md px-3 py-1 text-sm',
						'focus:outline focus:outline-offset-2 focus:outline-teal-500',
						hovered ? 'bg-teal-500/20 text-teal-300' : ''
					)}
			>
				{#snippet children({ selected })}
					{label}
					{#if selected}
						<DotIcon class="absolute -left-6 size-10 text-teal-500" />
					{/if}
				{/snippet}
			</TreeButton>
			{#if children}
				<TreeGroup class="pl-2">
					{@render buildTree(children)}
				</TreeGroup>
			{/if}
		</TreeItem>
	{/each}
{/snippet}

<Tree>
	{@render buildTree(data)}
</Tree>
