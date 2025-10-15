<script module>
	import { createHighlighter } from 'shiki';

	const getHighlighter = await createHighlighter({
		themes: ['github-light', 'github-dark'],
		langs: ['javascript', 'typescript', 'svelte', 'css', 'text', 'bash']
	});

	export function highlighter(code: string, lang = 'svelte') {
		const html = getHighlighter.codeToHtml(code, { lang, themes: { light: 'github-light', dark: 'github-dark' } });
		return html;
	}
</script>

<script lang="ts">
	import { Tabs, TabsButton, TabsContent, TabsList } from '$lib/index.js';
	import { Frame } from '$site/index.js';

	import type { Component } from 'svelte';

	let {
		code,
		Comp,
		hideCode
	}: {
		code: string;
		Comp: Component;
		hideCode?: boolean;
	} = $props();
</script>

{#snippet tabBtn(value: string)}
	<TabsButton
		{value}
		class={({ active }) => [
			[
				'relative flex cursor-pointer items-center justify-center px-3.5 py-2 backdrop-blur-md select-none',
				active
					? 'bg-teal-600/15 text-teal-600 dark:bg-teal-500/10 dark:text-teal-50'
					: 'hover:bg-black/5 dark:hover:bg-white/5'
			]
		]}
	>
		{#snippet children({ active })}
			{#if active}
				<div class="absolute left-0 h-full w-3 border-y border-l border-teal-500"></div>
				<div class="absolute right-0 h-full w-3 border-y border-r border-teal-500"></div>
			{/if}
			{value}
		{/snippet}
	</TabsButton>
{/snippet}

<Frame>
	<Tabs class="not-prose flex-1 flex-col overflow-y-auto">
		{#if !hideCode}
			<TabsList class="absolute top-4 right-4 z-10 flex items-center gap-2">
				{@render tabBtn('Preview')}
				{@render tabBtn('Code')}
			</TabsList>
		{/if}

		<div class="relative flex max-h-[500px] min-h-[500px]">
			<TabsContent value="Preview" class="absolute inset-0 flex flex-1 items-center justify-center">
				<Comp />
			</TabsContent>

			{#if !hideCode}
				<TabsContent value="Code" class="absolute inset-0 flex w-full flex-1 flex-col">
					{@html highlighter(code.replace('$lib/index.js', 'lithesome'))}
				</TabsContent>
			{/if}
		</div>
	</Tabs>
</Frame>
