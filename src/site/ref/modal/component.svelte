<script lang="ts">
	import { Modal, ModalContent, ModalDescription, ModalOverlay, ModalTitle } from '$lib/index.js';
	import { Button, Input } from '$site/index.js';
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade, fly } from 'svelte/transition';

	let visible = $state(false);

	let currentPwd = $state('');
	let newPwd = $state('');
	let repeatPwd = $state('');
	let errors = $state<{
		currentPwd?: string;
		newPwd?: string;
		repeatPwd?: string;
	}>({
		currentPwd: '',
		newPwd: '',
		repeatPwd: ''
	});

	const submit = () => {
		if (newPwd !== repeatPwd) {
			errors.newPwd = 'Passwords do not match.';
			return;
		}

		visible = false;
		currentPwd = '';
		newPwd = '';
		repeatPwd = '';
		errors = {};
	};
</script>

<Button variant="primary" onclick={() => (visible = true)}>Update Password</Button>

<Modal bind:visible>
	<ModalOverlay
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur"
		transition={[fade, { duration: 200 }]}
		onclick={() => (visible = false)}
	/>
	<ModalContent
		transition={[fly, { y: 15, duration: 150 }]}
		class="fixed left-1/2 top-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-500 bg-white/95 p-8 shadow-xl dark:border-white/10 dark:bg-neutral-950/95"
	>
		<header class="flex items-center justify-between">
			<div>
				<ModalTitle class="mb-2 text-xl font-semibold text-black dark:text-white">Update Password</ModalTitle>
				<ModalDescription class="text-sm text-neutral-400 dark:text-neutral-500">
					Change the password to your account.
				</ModalDescription>
			</div>
		</header>
		<main class="mt-8 flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="password" class="inline-flex text-sm">
					Current Password <span class="text-red-500">*</span>
				</label>
				<Input bind:value={currentPwd} id="password" type="password" data-lpignore="true" />
			</div>
			<div class="flex flex-col gap-2">
				<label for="password-new" class="inline-flex text-sm">
					New Password <span class="text-red-500">*</span>
				</label>
				<Input bind:value={newPwd} error={errors.newPwd} id="password-new" type="password" data-lpignore="true" />
				{#if errors.newPwd}
					<p class="text-xs text-red-500">{errors.newPwd}</p>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<label for="password-repeat" class="inline-flex text-sm">
					Repeat New Password <span class="text-red-500">*</span>
				</label>
				<Input bind:value={repeatPwd} id="password-repeat" type="password" data-lpignore="true" />
			</div>
			<div class="flex justify-end">
				<Button variant="primary" class="px-10" onclick={submit}>Save</Button>
			</div>
		</main>
		<button
			type="button"
			class="focusOutline absolute right-6 top-6 rounded-md p-2 hover:bg-black/10 dark:hover:bg-white/10"
			onclick={() => (visible = false)}
		>
			<Icon src={X} class="h-6 w-6" />
		</button>
	</ModalContent>
</Modal>
