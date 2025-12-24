<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import { Dropzone, DropzoneInput } from '$lib/index.js';
	import Button from '$site/components/Button.svelte';

	import type { DropzoneErrorEvents } from '$lib/types/index.js';

	let files = $state<File[]>([]);
	let errorMessage = $state<string | null>(null);

	const removeFile = (index: number) => {
		files = files.filter((_, i) => index !== i);
	};

	const onError = (data: DropzoneErrorEvents) => {
		if (data.type === 'invalidType') errorMessage = 'File is not text or image';
		if (data.type === 'maxSize') errorMessage = 'File size is too large';
	};
	const onChange = () => {
		errorMessage = null;
	};
</script>

<div class="w-[550px]">
	<Dropzone
		bind:files
		class={({ dragging, errors }) => [
			'flex cursor-pointer flex-col border-2 border-dashed py-8 text-center',
			!dragging &&
				!errors && ['border-zinc-400 hover:border-zinc-600', 'dark:border-zinc-800 dark:hover:border-zinc-600'],
			dragging && !errors && ['border-zinc-600 dark:border-zinc-600'],
			errors && 'border-rose-600 dark:border-rose-500'
		]}
		accept=".txt, image/*"
		multiple
		{onError}
		{onChange}
		onSuccess={console.log}
		validate={(file, files) => {
			const fileExists = files.some((fl) => fl.name === file.name && fl.size === file.size);
			if (fileExists) errorMessage = 'Duplicate files cannot be added';

			return !fileExists;
		}}
	>
		<DropzoneInput />
		<span class="text-lg">Drag and Drop file</span>
		<span class="test-sm mt-1 opacity-50">Or click to choose</span>
		<span class={[errorMessage ? 'text-rose-600 dark:text-rose-500' : 'opacity-25', 'mt-4 text-sm']}>
			{errorMessage || 'text or image'}
		</span>
	</Dropzone>

	<div class="mt-4 flex flex-col gap-2">
		{#each files as file, i}
			<div class="flex items-center gap-2">
				<div class="flex flex-1 flex-col justify-center gap-2">
					<span class="text-xs">{file.name}</span>
					<span class="text-xs opacity-50">{file.type}</span>
				</div>
				<Button variant="text" size="sm" onclick={() => removeFile(i)}>
					<XIcon class="size-4" />
				</Button>
			</div>
			{#if i !== files.length - 1}
				<hr class="border-zinc-400 dark:border-zinc-800" />
			{/if}
		{/each}
	</div>
</div>
