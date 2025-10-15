<script>
	import { Tabs, TabsButton, TabsContent, TabsList } from '$lib/index.js';

	const tabs = [
		{
			value: 'Recent',
			items: [
				{ title: 'About the bird?', time: '1h ago', author: 'Gibbu' },
				{ title: 'Have you heard?', time: '3h ago', author: 'Gibbu' }
			]
		},
		{
			value: 'Popular',
			items: [
				{ title: 'Is Microsoft bad?', time: '25th Jan', author: 'Johnny' },
				{ title: 'Vibe code to infinity!', time: '3rd Jan', author: 'James' }
			]
		}
	];
</script>

<Tabs class="w-[60%]">
	<TabsList class="mb-3 flex gap-2">
		{#each tabs as tab}
			<TabsButton
				value={tab.value}
				class={({ active }) => [
					'cursor-pointer rounded-full px-3 py-2 text-sm select-none',
					active ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/5 hover:dark:bg-white/5'
				]}
			>
				{tab.value}
			</TabsButton>
		{/each}
	</TabsList>

	<div class="rounded-xl bg-white p-3 dark:bg-zinc-800">
		{#each tabs as tab}
			<TabsContent value={tab.value} class="flex flex-col gap-1">
				{#each tab.items as item}
					<div class="rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5">
						<span class="block font-semibold">{item.title}</span>
						<small class="block opacity-50">{item.time} · {item.author}</small>
					</div>
				{/each}
			</TabsContent>
		{/each}
	</div>
</Tabs>
