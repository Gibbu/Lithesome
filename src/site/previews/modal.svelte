<script lang="ts">
	import { Modal, ModalContent, ModalDescription, ModalOverlay, ModalTitle } from '$lib/index.js';
	import { Button } from '$site/index.js';
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade, fly } from 'svelte/transition';

	let visible = $state(false);
</script>

<Button variant="primary" onclick={() => (visible = true)}>Edit Profile</Button>
<Modal bind:visible>
	<ModalOverlay
		class="fixed inset-0 bg-black/50 backdrop-blur"
		transition={[fade, { duration: 200 }]}
		onclick={() => (visible = false)}
	/>
	<ModalContent
		transition={[fly, { y: 15, duration: 150 }]}
		class="fixed left-1/2 top-1/2 w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/20 bg-black/90 p-6 shadow-xl"
	>
		<header class="flex items-center justify-between">
			<div>
				<ModalTitle class="mb-2 text-xl font-semibold text-white">Edit your profile</ModalTitle>
				<ModalDescription class="text-sm text-neutral-500"
					>Change the visibility of your posts, likes, shares, ect...</ModalDescription
				>
			</div>
			<button type="button" class="rounded-md p-2 hover:bg-white/10" onclick={() => (visible = false)}>
				<Icon src={X} class="h-6 w-6" />
			</button>
		</header>
	</ModalContent>
</Modal>
