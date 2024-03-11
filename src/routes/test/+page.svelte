<script lang="ts">
	import { scale } from 'svelte/transition';
	import { Button, cn } from '$site/index.js';
	import { Menu, MenuTrigger, MenuDropdown, MenuItem } from '$lib/index.js';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, Cog, LogOut, Home } from '@steeze-ui/lucide-icons';

	const menuitems = [
		{ label: 'Home', icon: Home, href: '/' },
		{ label: 'My Profile', icon: User },
		{ label: 'Account Settings', icon: Cog },
		{ label: 'Logout', icon: LogOut, danger: true }
	];
</script>

<div class="wrap pt-24">
	<section>
		<h2>Menu</h2>
		<Menu>
			<MenuTrigger>
				<Button variant="primary">Open Menu</Button>
			</MenuTrigger>
			<MenuDropdown
				transition={[scale, { start: 0.8, duration: 150 }]}
				class="w-full max-w-[195px] origin-top-left rounded-xl border border-white/20 bg-black/75 p-2 shadow-xl backdrop-blur"
			>
				{#each menuitems as { label, icon, danger, href }}
					<MenuItem
						{href}
						class={({ hovered }) =>
							cn(
								hovered && !danger ? 'bg-white/10 text-white' : '',
								danger ? 'text-red-400' : '',
								hovered && danger ? 'bg-red-500 text-white' : '',
								'flex w-full items-center gap-2 rounded-md px-3.5 py-2.5 text-sm'
							)}
					>
						<Icon src={icon} class="h-4 w-4" />
						{label}
					</MenuItem>
				{/each}
			</MenuDropdown>
		</Menu>
	</section>
	<section>
		<h2>Select</h2>
	</section>
</div>

<style lang="postcss">
	section {
		@apply mb-16 border-b border-white/10 pb-16 last:border-none;
	}
	h2 {
		@apply mb-6 text-4xl font-semibold text-white;
	}
</style>
