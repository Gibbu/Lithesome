<script lang="ts">
	import { onDestroy, type SvelteComponent } from 'svelte';
	import { cn } from '../utils.js';
	import { getSingletonHighlighter } from 'shiki';
	import { Tabs, TabsList, TabsButton, TabsContent } from '$lib/index.js';
	import { EyeIcon, CodeIcon } from 'lucide-svelte';

	interface Props {
		component: typeof SvelteComponent<any, any, any>;
		props: Record<string, any>;
		code: string;
		class?: string;
	}

	let { component, props, code, class: klass }: Props = $props();

	const getHighlight = getSingletonHighlighter({
		themes: ['github-dark', 'github-light'],
		langs: ['javascript', 'typescript', 'svelte', 'css', 'text']
	});
</script>

{#snippet pill()}
	<div class="absolute bottom-1 size-1 rounded-full bg-teal-500 dark:bg-teal-400"></div>
{/snippet}

<Tabs
	value="preview"
	class={cn(
		'not-prose flex-centre highlight relative min-h-[450px] flex-col rounded-xl bg-neutral-100 dark:bg-neutral-900',
		klass
	)}
>
	<TabsList
		class="absolute right-4 top-4 z-10 flex overflow-hidden rounded-md bg-white shadow-md backdrop-blur dark:bg-neutral-700/50"
	>
		<TabsButton
			value="preview"
			class={({ active }) => cn('flex-centre relative p-2', active ? 'text-black dark:text-white' : '')}
		>
			{#snippet children({ active })}
				<EyeIcon class="size-6" />
				{#if active}
					{@render pill()}
				{/if}
			{/snippet}
		</TabsButton>
		<TabsButton
			value="code"
			class={({ active }) => cn('flex-centre relative p-2', active ? 'text-black dark:text-white' : '')}
		>
			{#snippet children({ active })}
				<CodeIcon class="size-6" />
				{#if active}
					{@render pill()}
				{/if}
			{/snippet}
		</TabsButton>
	</TabsList>
	<TabsContent value="preview" class="flex-centre w-full p-8">
		<svelte:component this={component} {...props} />
	</TabsContent>
	<TabsContent value="code" class="preview-codeblock w-full">
		{#if code}
			{#await getHighlight then highlight}
				{@html highlight.codeToHtml(code.replaceAll('$lib/index.js', 'lithesome'), {
					lang: 'svelte',
					themes: { light: 'github-light', dark: 'github-dark' }
				})}
			{/await}
		{/if}
	</TabsContent>
</Tabs>
