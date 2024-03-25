<script lang="ts">
	import { Tabs, TabsButton, TabsContent, TabsList } from '$lib/index.js';
	import { cn } from '$site/index.js';

	const tabs = [
		{
			btn: 'today',
			content: [
				{
					title: 'Food shopping',
					date: {
						time: '12:00pm',
						date: undefined,
						daysLeft: undefined
					}
				},
				{
					title: `John's Birthday party`,
					date: {
						time: '5:00pm',
						date: undefined,
						daysLeft: undefined
					}
				}
			]
		},
		{
			btn: 'upcoming',
			content: [
				{
					title: 'Work management meeting',
					date: {
						time: '12:00pm',
						date: '22/03/2024',
						daysLeft: '2 days'
					}
				},
				{
					title: `Jane's Birthday`,
					date: {
						time: '8:00pm',
						date: '24/03/2024',
						daysLeft: '4 days'
					}
				}
			]
		}
	];
</script>

<Tabs class="w-full max-w-[70%] rounded-md border border-neutral-300 bg-white dark:border-white/10 dark:bg-white/5">
	<TabsList class="flex border-b border-neutral-300 dark:border-white/10">
		{#each tabs as tab}
			<TabsButton
				value={tab.btn}
				class={({ active }) =>
					cn(
						'relative flex-1 border-r py-4 text-center capitalize last:border-r-0',
						'border-neutral-300 hover:bg-black/[0.035] dark:border-white/10 dark:hover:bg-white/5',
						active ? 'text-black dark:text-white' : ''
					)}
			>
				{#snippet children({ active })}
					{tab.btn}
					{#if active}
						<div class="absolute bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-xl bg-teal-500"></div>
					{/if}
				{/snippet}
			</TabsButton>
		{/each}
	</TabsList>
	{#each tabs as tab}
		<TabsContent value={tab.btn} class="p-4">
			{#each tab.content as { title, date }}
				<div class="rounded-md px-5 py-2 hover:bg-black/[0.035] dark:hover:bg-white/5">
					<h4 class="font-medium text-black dark:text-white">{title}</h4>
					<p class="text-neutral-500 dark:text-neutral-400">
						{#if date.date}
							<span>{date.date} -</span>
						{/if}
						{date.time}
						{#if date.daysLeft}
							<span>(in {date.daysLeft})</span>
						{/if}
					</p>
				</div>
			{/each}
		</TabsContent>
	{/each}
</Tabs>
