<script lang="ts">
	import { UserIcon, CogIcon, LogOutIcon, CreditCardIcon } from 'lucide-svelte';
	import { Menu, MenuContent, MenuItem, MenuTrigger } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { scale } from 'svelte/transition';

	const menuitems = [
		{ label: 'My Profile', icon: UserIcon },
		{ label: 'Account Settings', icon: CogIcon },
		{ label: 'Payments', icon: CreditCardIcon, disabled: true },
		{ label: 'Logout', icon: LogOutIcon, danger: true }
	];
</script>

<Menu>
	<MenuTrigger>
		<Button variant="primary">Open Menu</Button>
	</MenuTrigger>
	<MenuContent
		transition={[scale, { start: 0.8, duration: 150 }]}
		class={cn(
			'w-[215px] origin-top translate-y-1 rounded-xl border p-2 shadow-xl backdrop-blur ',
			'border-neutral-300 bg-white shadow-neutral-200',
			'dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[#111]'
		)}
		constrainViewport
	>
		{#each menuitems as { label, icon: Icon, danger, disabled }}
			<MenuItem
				{disabled}
				class={({ hovered }) =>
					cn(
						disabled ? 'text-black/40 dark:text-white/40' : '',
						hovered && !danger ? 'bg-black/10 text-black dark:bg-white/10 dark:text-white' : '',
						danger ? 'text-red-400' : '',
						hovered && danger ? 'bg-red-500 text-black' : '',
						'flex w-full items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-semibold'
					)}
			>
				<Icon class="size-4" />
				{label}
				{#if disabled}
					<span
						class="rounded-md bg-teal-600/20 px-2 py-0.5 text-xs text-teal-300 dark:bg-teal-500/30 dark:text-teal-300"
						>Soon</span
					>
				{/if}
			</MenuItem>
		{/each}
	</MenuContent>
</Menu>
