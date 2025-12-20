<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Modal, ModalBackdrop, ModalContent, ModalDescription, ModalTitle, ModalTrigger } from '$lib/index.js';
	import Button from '$site/components/Button.svelte';
	import Container from '$site/components/Container.svelte';

	let visible = $state(false);

	let inputValue = $state('');

	const deleteAccount = () => {
		inputValue = '';
		visible = false;
	};
</script>

<Modal bind:visible>
	<ModalTrigger>
		{#snippet custom({ props })}
			<Button variant="secondary" {...props}>Delete Account</Button>
		{/snippet}
	</ModalTrigger>

	<ModalBackdrop>
		{#snippet custom({ props, state })}
			{#if state.visible}
				<div class="fixed inset-0 z-50 bg-black/25 backdrop-blur" {...props} transition:fade={{ duration: 150 }}></div>
			{/if}
		{/snippet}
	</ModalBackdrop>
	<ModalContent>
		{#snippet custom({ props, state })}
			{#if state.visible}
				<div
					{...props}
					transition:fly={{ y: 5, duration: 200 }}
					class="fixed top-1/2 left-1/2 z-50 w-[700px] -translate-1/2"
				>
					<Container>
						{#snippet header()}
							<ModalTitle class="text-2xl text-black dark:text-white">Delete Account</ModalTitle>
							<ModalDescription class="mt-2 text-sm">
								This action will remove all data related to you from our systems.
							</ModalDescription>
						{/snippet}

						<p class="mb-6 text-zinc-600 dark:text-zinc-300">
							To confirm this action, type "<b class="text-black dark:text-white">hamburger</b>" in the field below.
						</p>
						<input
							type="text"
							bind:value={inputValue}
							class={[
								'w-full border border-zinc-400 px-4 py-3 dark:border-zinc-800',
								'hover:border-zinc-600 dark:hover:border-zinc-700',
								'focus:border-teal-500 focus:outline-none dark:focus:border-teal-500',
								'text-black dark:text-zinc-200'
							]}
							placeholder="Type hamburger to delete account..."
						/>

						{#snippet footer()}
							<Button variant="text" onclick={() => (visible = false)}>Cancel</Button>
							<Button variant="danger" disabled={inputValue !== 'hamburger'} onclick={deleteAccount}>
								Delete my Account
							</Button>
						{/snippet}
					</Container>
				</div>
			{/if}
		{/snippet}
	</ModalContent>
</Modal>
