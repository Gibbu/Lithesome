<script lang="ts">
	import { Tree, TreeItem, TreeGroup, TreeButton } from '$lib/index.js';
	import { cn } from '$site/utils.js';
	import { DotIcon, Folder, FolderOpen, FileCode } from 'lucide-svelte';

	interface TreeData {
		id: string;
		label: string;
		items?: TreeData[];
	}

	const data: TreeData[] = [
		{
			label: 'src',
			id: 'src',
			items: [
				{
					label: 'lib',
					id: 'src/lib',
					items: [
						{
							label: 'components',
							id: 'src/lib/components',
							items: [
								{
									id: 'src/lib/components/Accordion',
									label: 'Accordion',
									items: [
										{ id: 'main.svelte.ts', label: 'main.svelte.ts' },
										{ id: 'Accordion.svelte', label: 'Accordion.svelte' }
									]
								}
							]
						},
						{
							label: 'actions',
							id: 'src/lib/actions',
							items: [
								{ id: 'useOutside.ts', label: 'useOutside.ts' },
								{ id: 'usePortal.ts', label: 'usePortal.ts' },
								{ id: 'useTrap.ts', label: 'useTrap.ts' }
							]
						}
					]
				},
				{
					label: 'routes',
					id: 'lib/routes',
					items: [
						{ id: '+page.svelte', label: '+page.svelte' },
						{ id: '+layout.svelte', label: '+layout.svelte' },
						{ id: '+page.server.ts', label: '+page.server.ts' }
					]
				}
			]
		},
		{ id: 'vite.config.js', label: 'vite.config.js' },
		{ id: 'svelte.config.js', label: 'svelte.config.js' }
	];

	let value = $state<string[]>([]);
</script>

{#snippet buildTree(data: TreeData[])}
	{#each data as { id, label, items }}
		<TreeItem {id}>
			<TreeButton
				class={({ hovered }) =>
					cn(
						'relative flex items-center gap-2 rounded-md px-3 py-1 text-sm',
						'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-teal-500',
						hovered ? 'bg-teal-600/20 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300' : ''
					)}
			>
				{#snippet children({ selected, active })}
					{#if items && active}
						<FolderOpen class="size-4" />
					{:else if items && !active}
						<Folder class="size-4" />
					{:else}
						<FileCode class="size-4" />
					{/if}
					{label}
					{#if selected}
						<DotIcon class="absolute -left-6 size-10 text-teal-500" />
					{/if}
				{/snippet}
			</TreeButton>
			{#if items}
				<TreeGroup class="pl-6">
					{@render buildTree(items)}
				</TreeGroup>
			{/if}
		</TreeItem>
	{/each}
{/snippet}

<Tree bind:value>
	{@render buildTree(data)}
</Tree>

<span class="absolute bottom-2 right-2">{value}</span>
