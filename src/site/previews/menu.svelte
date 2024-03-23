<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, Cog, LogOut, CreditCard } from '@steeze-ui/lucide-icons';
	import { Menu, MenuDropdown, MenuItem, MenuTrigger } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';
	import { scale } from 'svelte/transition';

	const menuitems = [
		{ label: 'My Profile', icon: User },
		{ label: 'Account Settings', icon: Cog },
		{ label: 'Payments', icon: CreditCard, disabled: true },
		{ label: 'Logout', icon: LogOut, danger: true }
	];
</script>

<Menu>
	<MenuTrigger>
		<Button variant="primary">Open Menu</Button>
	</MenuTrigger>
	<MenuDropdown
		transition={[scale, { start: 0.8, duration: 150 }]}
		class="w-[215px] origin-top translate-y-1 rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-xl shadow-[#111] backdrop-blur"
		constrainViewport
	>
		{#each menuitems as { label, icon, danger, disabled }}
			<MenuItem
				{disabled}
				class={({ hovered }) =>
					cn(
						disabled ? 'text-white/40' : '',
						hovered && !danger ? 'bg-white/10 text-white' : '',
						danger ? 'text-red-400' : '',
						hovered && danger ? 'bg-red-500 text-black' : '',
						'flex w-full items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-semibold'
					)}
			>
				<Icon src={icon} class="h-4 w-4" />
				{label}
				{#if disabled}
					<span class="rounded-md bg-teal-500/30 px-2 py-0.5 text-xs text-teal-300">Soon</span>
				{/if}
			</MenuItem>
		{/each}
	</MenuDropdown>
</Menu>
