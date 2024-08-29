<script lang="ts">
	import { cn } from '../utils.js';
	import { getSingletonHighlighter } from 'shiki';
	import { Tabs, TabsList, TabsButton, TabsContent } from '$lib/index.js';
	import { EyeIcon, CodeIcon } from 'lucide-svelte';
	import { highlighter } from '$site/index.js';
	import type { SvelteComponent } from 'svelte';

	interface Props {
		component: typeof SvelteComponent<any, any, any>;
		props: Record<string, any>;
		code: string;
		class?: string;
	}

	let { component, props, code, class: klass }: Props = $props();
</script>

{#snippet tabBtn(icon: any, value: string)}
	<TabsButton
		value={value.toLowerCase()}
		class={({ active }) =>
			cn(
				'flex-centre relative flex-1 gap-2 rounded-md py-3 text-sm font-medium',
				active
					? 'bg-neutral-200 text-black dark:bg-neutral-900 dark:text-white'
					: 'hover:bg-neutral-100 dark:hover:bg-neutral-920'
			)}
	>
		<svelte:component this={icon} class="size-4" />
		{value}
	</TabsButton>
{/snippet}
<Tabs
	value="preview"
	class={cn(
		'not-prose flex-centre relative -mx-8 -mt-2 flex-col border-y border-neutral-200 dark:border-neutral-900',
		klass
	)}
>
	<TabsList
		class="z-10 flex w-full gap-4 overflow-hidden border-b border-e-neutral-200 p-3 backdrop-blur dark:border-neutral-900"
	>
		{@render tabBtn(EyeIcon, 'Preview')}
		{@render tabBtn(CodeIcon, 'Code')}
	</TabsList>
	<div class="flex max-h-[450px] min-h-[450px] w-full flex-1 flex-col">
		<TabsContent value="preview" class="flex-centre w-full flex-1 p-8">
			<svelte:component this={component} {...props} />
		</TabsContent>
		<TabsContent value="code" class="preview-codeblock w-full">
			{#if code}
				{@html highlighter(code.replaceAll('$lib/index.js', 'lithesome'))}
			{/if}
		</TabsContent>
	</div>
</Tabs>
