<script lang="ts">
	import { Tabs, TabsList, TabsButton, TabsContent } from '$lib/index.js';
	import { EyeIcon, CodeIcon, BookOpenText } from 'lucide-svelte';
	import { cn } from '$site/utils.js';
	import { highlighter } from '$site/highlighter.js';
	import ComponentAPI from './ComponentAPI.svelte';
	import ActionAPI from './ActionAPI.svelte';

	import type { ActionReference, ComponentReference } from '$site/types.js';
	import type { Snippet, SvelteComponent } from 'svelte';

	interface Props {
		children: Snippet;
		component: typeof SvelteComponent<any, any, any>;
		code: string;
		componentAPI?: ComponentReference[];
		actionAPI?: ActionReference;
	}

	let tabValue = $state<string>('preview');

	let { children, component: Component, code, componentAPI, actionAPI }: Props = $props();
</script>

{#snippet tabBtn(Icon: any, value: string)}
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
		<Icon class="size-4" />
		{value}
	</TabsButton>
{/snippet}
<Tabs
	bind:value={tabValue}
	class="flex-centre relative -mx-8 -mt-2 flex-col border-y border-neutral-200 dark:border-neutral-900"
>
	{#snippet children({ tab })}
		<TabsList
			class="not-prose z-10 flex w-full gap-4 overflow-hidden border-b border-e-neutral-200 p-3 backdrop-blur dark:border-neutral-900"
		>
			{@render tabBtn(EyeIcon, 'Preview')}
			{@render tabBtn(CodeIcon, 'Code')}
			{@render tabBtn(BookOpenText, 'API')}
		</TabsList>
		<div class={cn('flex min-h-[450px] w-full flex-1 flex-col', tab === 'api' ? '' : 'max-h-[450px]')}>
			<TabsContent
				id="tabs-preview"
				value="preview"
				class="not-prose flex-centre w-full flex-1 overflow-y-auto overflow-x-hidden p-4"
			>
				<Component />
			</TabsContent>
			<TabsContent value="code" class="not-prose preview-codeblock w-full">
				{#if code}
					{@html highlighter(code.replaceAll('$lib/index.js', 'lithesome'))}
				{/if}
			</TabsContent>
			<TabsContent value="api" class="docprose px-8">
				{#if componentAPI}
					<ComponentAPI data={componentAPI} />
				{/if}
				{#if actionAPI}
					<ActionAPI data={actionAPI} />
				{/if}
			</TabsContent>
		</div>
	{/snippet}
</Tabs>

<div style:display={tabValue !== 'api' ? 'block' : 'none'}>
	{@render children()}
</div>
