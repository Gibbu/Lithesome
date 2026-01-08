<script>
	import { Tabs, TabsButton, TabsContent, TabsList } from '$lib/index.js';
	import { Button, Container } from '$site/index.js';

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
				{#snippet custom({ props, state })}
					<Button variant={state.active ? 'primary' : 'text'} {...props}>
						{tab.value}
					</Button>
				{/snippet}
			</TabsButton>
		{/each}
	</TabsList>

	{#each tabs as tab}
		<TabsContent value={tab.value}>
			{#snippet custom({ props })}
				<Container {...props}>
					{#each tab.items as item}
						<div class="px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5">
							<span class="block font-semibold">{item.title}</span>
							<small class="block opacity-50">{item.time} · {item.author}</small>
						</div>
					{/each}
				</Container>
			{/snippet}
		</TabsContent>
	{/each}
</Tabs>
