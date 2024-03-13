<script lang="ts">
	import { scale, slide } from 'svelte/transition';
	import { Button, cn } from '$site/index.js';
	import {
		Menu,
		MenuTrigger,
		MenuDropdown,
		MenuItem,
		Select,
		SelectTrigger,
		SelectValue,
		SelectDropdown,
		SelectOption,
		Accordion,
		AccordionHeading,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/index.js';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, Cog, LogOut, Home, ChevronDown, Check } from '@steeze-ui/lucide-icons';

	const menuitems = [
		{ label: 'Home', icon: Home, href: '/' },
		{ label: 'My Profile', icon: User },
		{ label: 'Account Settings', icon: Cog },
		{ label: 'Logout', icon: LogOut, danger: true }
	];

	let selectSingleValue = 'aang';
	let selectMultiValue: string[] = ['aang'];
	const selectoptions = [
		{ value: 'aang', label: 'Avatar Aang' },
		{ value: 'zuko', label: 'Firelord Zuko' },
		{ value: 'sokka', label: 'Councilman Sokka' },
		{ value: 'katara', label: 'Katara' },
		{ value: 'toph', label: 'Greatest Earthbender Alive' }
	];

	const accordionitems = [
		{ title: 'Hamburger Cheeseburger Big Mac', content: 'WHOPPERRRRRRR' },
		{ title: 'How does one get good?', content: `Just don't. Give up.` }
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
		<div class="row">
			<div>
				<h3>Single value</h3>
				<Select bind:value={selectSingleValue}>
					<SelectTrigger>
						<Button variant="primary" class="w-[250px] max-w-[250px] justify-start truncate text-left">
							<SelectValue placeholder="Select an option..." class="flex-1 truncate" />
							<Icon src={ChevronDown} class="h-6 w-6" />
						</Button>
					</SelectTrigger>
					<SelectDropdown
						stretch
						class="origin-top-left rounded-xl border border-white/20 bg-black/75 p-2 shadow-xl backdrop-blur"
						transition={[scale, { start: 0.8, duration: 150 }]}
					>
						{#each selectoptions as { value, label }}
							<SelectOption
								{value}
								class={({ hovered, selected }) =>
									cn(
										hovered ? 'bg-white/10 text-white' : '',
										selected ? 'text-violet-500' : '',
										'flex w-full items-center gap-2 truncate rounded-md px-3.5 py-2.5 text-sm'
									)}
							>
								{#snippet children({ selected })}
									<div class="flex-1 text-left">{label}</div>
									{#if selected}
										<Icon src={Check} class="h-4 w-4" />
									{/if}
								{/snippet}
							</SelectOption>
						{/each}
					</SelectDropdown>
				</Select>
				{selectSingleValue}
			</div>
			<div>
				<h3>Mulitple values</h3>
				<Select bind:value={selectMultiValue}>
					<SelectTrigger>
						<Button variant="primary" class="w-[250px] max-w-[250px] justify-start truncate text-left">
							<SelectValue placeholder="Select an option..." class="flex-1 truncate" />
							<Icon src={ChevronDown} class="h-6 w-6" />
						</Button>
					</SelectTrigger>
					<SelectDropdown
						stretch
						class="origin-top-left rounded-xl border border-white/20 bg-black/75 p-2 shadow-xl backdrop-blur"
						transition={[scale, { start: 0.8, duration: 150 }]}
					>
						{#each selectoptions as { value, label }}
							<SelectOption
								{value}
								class={({ hovered, selected }) =>
									cn(
										hovered ? 'bg-white/10 text-white' : '',
										selected ? 'text-violet-500' : '',
										'flex w-full items-center gap-2 truncate rounded-md px-3.5 py-2.5 text-sm'
									)}
							>
								{#snippet children({ selected })}
									<div class="flex-1 text-left">{label}</div>
									{#if selected}
										<Icon src={Check} class="h-4 w-4" />
									{/if}
								{/snippet}
							</SelectOption>
						{/each}
					</SelectDropdown>
				</Select>
				{selectMultiValue}
			</div>
		</div>
	</section>

	<section>
		<h2>Accordion</h2>
		<Accordion single class="rounded-md border border-white/10 bg-white/5 backdrop-blur">
			{#each accordionitems as { title, content }}
				<AccordionItem class="border-b border-white/10 last:border-none">
					<AccordionHeading>
						<AccordionTrigger class="flex w-full items-center justify-between gap-4 p-4 hover:bg-white/5">
							{#snippet children({ active })}
								{title}
								<Icon src={ChevronDown} class={cn('h-6 w-6 transition-transform', active ? 'rotate-180' : '')} />
							{/snippet}
						</AccordionTrigger>
					</AccordionHeading>
					<AccordionContent transition={[slide, { duration: 150 }]} class="p-4">{content}</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</section>
</div>

<style lang="postcss">
	section {
		@apply mb-16 border-b border-white/10 pb-16 last:border-none;
	}
	h2 {
		@apply mb-6 text-4xl font-bold text-white;
	}
	h3 {
		@apply mb-6 text-2xl font-semibold text-white;
	}
	.row {
		@apply flex gap-8;
	}
</style>
