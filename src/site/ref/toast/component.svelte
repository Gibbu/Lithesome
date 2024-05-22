<script lang="ts">
	import { toaster, Toaster, Toast, ToastTitle, ToastMessage } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { X, XCircle, CheckCircle, AlertCircle, Info, Star } from '@steeze-ui/lucide-icons';
	import type { ToastType } from '$lib/index.js';

	const types = [
		{
			type: 'success',
			config: {
				title: 'Profile updated.',
				message: 'Your profile details have been updated.'
			},
			icon: CheckCircle,
			colour: 'text-emerald-500'
		},
		{
			type: 'warning',
			config: {
				title: 'Content removed.',
				message: 'This content is no longer available.'
			},
			icon: AlertCircle,
			colour: 'text-yellow-500'
		},
		{
			type: 'error',
			config: {
				title: 'Validation errors.',
				message: 'The form has errors that are required to be amended.'
			},
			icon: XCircle,
			colour: 'text-red-500'
		},
		{
			type: 'attention',
			config: {
				title: 'New update.',
				message: `We've dropped a new updated, check it out.`
			},
			icon: Star,
			colour: 'text-blue-500'
		},
		{
			type: 'info',
			config: {
				title: 'Quick tip.',
				message: `You can press M1 to oingo boingo.`
			},
			icon: Info,
			colour: 'text-neutral-500'
		}
	];

	const getType = (type: string) => {
		const { icon, colour } = types.find((el) => el.type === type)!;
		return {
			icon,
			colour
		};
	};

	const addToast = () => {
		const data = types[Math.floor(Math.random() * types.length)];
		toaster.add(data.type as ToastType, data.config);
	};
</script>

<Button variant="primary" onclick={addToast}>Add Toast</Button>

<Toaster class="pointer-events-none fixed inset-0 z-10 flex flex-col items-end justify-end gap-2 p-6">
	{#snippet children(toasts)}
		{#each toasts as toast (toast.id)}
			{@const { icon, colour } = getType(toast.type)}
			<div
				in:scale={{ start: 0.75, opacity: 0, duration: 150 }}
				out:scale={{ duration: 150 }}
				animate:flip={{ duration: 150 }}
				class="origin-bottom-right"
			>
				<Toast
					class="dark:highlight group pointer-events-auto relative flex items-center gap-4 rounded-md bg-white px-5 py-4 shadow-lg dark:bg-neutral-900"
				>
					<Icon src={icon} class="size-6 {colour}" />
					<div>
						<ToastTitle class="font-semibold text-black dark:text-white">{toast.config.title}</ToastTitle>
						<ToastMessage class="mt-2 text-sm">{toast.config.message}</ToastMessage>
						<button
							type="button"
							class={cn(
								'absolute -right-2 -top-2 rounded-full border border-transparent bg-white p-1.5 opacity-0 shadow-md transition-opacity',
								'dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none',
								'hover:text-black group-hover:opacity-100 dark:hover:text-white'
							)}
							onclick={() => toaster.removeById(toast.id)}
						>
							<Icon src={X} class="size-3.5" />
						</button>
					</div>
				</Toast>
			</div>
		{/each}
	{/snippet}
</Toaster>
