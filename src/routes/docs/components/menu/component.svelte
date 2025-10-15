<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';
	import { Menu, MenuContent, MenuItem, MenuSub, MenuSubContent, MenuSubTrigger, MenuTrigger } from '$lib/index.js';
	import Button from '$site/components/Button.svelte';
	import { Container } from '$site/index.js';

	interface Item {
		value: string;
		disabled?: boolean;
		onclick?: () => void;
		children?: Item[];
	}

	let items: Item[] = [
		{
			value: 'Edit'
		},
		{ value: 'Copy' },
		{ value: 'Delete', disabled: true },
		{
			value: 'Sent to...',
			children: [
				{
					value: 'Admin',
					children: [
						{
							value: 'John',
							onclick() {
								console.log('Sent to John');
							}
						},
						{
							value: 'Lachie',
							onclick() {
								console.log('Sent to Lachie');
							}
						}
					]
				},
				{
					value: 'Moderator',
					children: [
						{
							value: 'Nick',
							onclick() {
								console.log('Sent to Nick');
							}
						},
						{
							value: 'Zac',
							onclick() {
								console.log('Sent to Zac');
							}
						}
					]
				}
			]
		}
	];
</script>

{#snippet menuContents(data: typeof items)}
	{#each data as item}
		{#if item.children}
			<MenuSub
				name={item.value}
				disabled={item.disabled}
				floatingConfig={{ placement: 'right-start', offset: { mainAxis: 6 } }}
			>
				<MenuSubTrigger
					class={({ active, opened, disabled }) => [
						'flex w-full cursor-pointer items-center justify-between px-6 py-2 text-left',
						(active || opened) && 'bg-zinc-900 text-zinc-200',
						disabled && 'opacity-50'
					]}
				>
					{item.value}
					<ChevronRightIcon class="size-4" />
				</MenuSubTrigger>
				<MenuSubContent>
					{#snippet custom({ attrs, state })}
						{#if state.visible}
							<Container {...attrs} bodyClass="p-0 py-3" containerClass="w-[200px]">
								{#if item.children}
									{@render menuContents(item.children)}
								{/if}
							</Container>
						{/if}
					{/snippet}
				</MenuSubContent>
			</MenuSub>
		{:else}
			<MenuItem
				class={({ active, disabled }) => [
					'block w-full cursor-pointer px-6 py-2 text-left',
					active && 'bg-zinc-900 text-zinc-200',
					disabled && 'opacity-50'
				]}
				disabled={item.disabled}
				onclick={item.onclick}
			>
				{item.value}
			</MenuItem>
		{/if}
	{/each}
{/snippet}

<Menu>
	<MenuTrigger>
		{#snippet custom({ attrs })}
			<Button variant="secondary" {...attrs}>Actions</Button>
		{/snippet}
	</MenuTrigger>
	<MenuContent>
		{#snippet custom({ attrs, state })}
			{#if state.visible}
				<Container {...attrs} bodyClass="p-0 py-3" containerClass="w-[200px]">
					{@render menuContents(items)}
				</Container>
			{/if}
		{/snippet}
	</MenuContent>
</Menu>
