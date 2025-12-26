<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import {
		CheckboxButton,
		CheckboxGroup,
		CheckboxLabel,
		Stepper,
		StepperItem,
		StepperJump,
		StepperLink,
		StepperNext,
		StepperPrev,
		StepperSteps
	} from '$lib/index.js';
	import Button from '$site/components/Button.svelte';
	import { Container } from '$site/index.js';

	let yes = $state(false);

	const steps = [
		{ name: 'longago', snippet: LongAgo },
		{ name: 'firenation', snippet: FireNation },
		{ name: 'vanished', snippet: Vanished, canGoNext: () => yes },
		{ name: 'foundhim', snippet: FoundHim },
		{ name: 'changeworld', snippet: ChangeWorld }
	];
</script>

{#snippet LongAgo()}
	<p>Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony.</p>
{/snippet}
{#snippet FireNation()}
	<p>Then, everything changed when the Fire Nation attacked.</p>
{/snippet}
{#snippet Vanished()}
	<p>Only the Avatar, master of all four elements, could stop them, but when the world needed him most, he vanished.</p>
	<br />
	<p>Did he vanish?</p>
	<CheckboxGroup bind:checked={yes} class="flex items-center gap-3">
		<CheckboxButton
			class={({ checked }) => [
				'flex size-8 cursor-pointer border',
				checked ? 'border-teal-500 bg-teal-500' : ['border-zinc-400', 'border:border-zinc-800']
			]}
		>
			{#snippet children({ checked })}
				{#if checked}
					<CheckIcon class="m-auto size-5 text-black" />
				{/if}
			{/snippet}
		</CheckboxButton>
		<CheckboxLabel class="cursor-pointer select-none">Yes he did 👍</CheckboxLabel>
	</CheckboxGroup>
{/snippet}
{#snippet FoundHim()}
	<p>A hundred years passed and my brother and I discovered the new Avatar, an airbender named Aang.</p>
{/snippet}
{#snippet ChangeWorld()}
	<p>
		And although his airbending skills are great, he has a lot to learn before he's ready to save anyone. But I believe
		Aang can save the world.
	</p>
	<StepperJump name="longago">
		{#snippet custom({ props })}
			<Button variant="secondary" {...props}>Back to start</Button>
		{/snippet}
	</StepperJump>
{/snippet}

<Stepper>
	{#snippet children({ previousStepIndex, currentStepIndex })}
		<div class="flex flex-col gap-2">
			<StepperSteps class="flex items-center justify-between">
				{#each steps as step, i}
					<StepperLink item={step.name} class={['cursor-pointer text-sm', currentStepIndex > i && 'text-teal-500']}>
						{step.name}
					</StepperLink>
					{#if i !== steps.length - 1}
						<div
							class={['h-0.5 w-8 rounded-md', currentStepIndex > i ? 'bg-teal-500' : 'bg-zinc-400 dark:bg-zinc-600']}
						></div>
					{/if}
				{/each}
			</StepperSteps>
			<Container containerClass="w-[550px] h-[250px] flex flex-col" bodyClass="flex-1">
				<div class="stepContainer">
					{#each steps as step, i}
						<StepperItem name={step.name} canGoNext={step.canGoNext}>
							{#snippet custom({ props })}
								{#if i === currentStepIndex}
									<div
										{...props}
										class="stepContent"
										in:fly={{ x: currentStepIndex > previousStepIndex ? 20 : -20, duration: 140, delay: 140 }}
										out:fly={{ x: currentStepIndex > previousStepIndex ? -20 : 20, duration: 140 }}
									>
										{@render step.snippet()}
									</div>
								{/if}
							{/snippet}
						</StepperItem>
					{/each}
				</div>
			</Container>
		</div>

		<div class="mt-4 flex justify-between">
			<StepperPrev>
				{#snippet custom({ props, state })}
					<Button variant="text" {...props} disabled={state.disabled}>
						<ArrowLeftIcon class="size-4" />
						Prev
					</Button>
				{/snippet}
			</StepperPrev>
			<StepperNext>
				{#snippet custom({ props, state })}
					<Button variant="secondary" {...props} disabled={state.disabled}>
						Next
						<ArrowRightIcon class="size-4" />
					</Button>
				{/snippet}
			</StepperNext>
		</div>
	{/snippet}
</Stepper>

<style>
	.stepContainer {
		display: grid;
		grid-template-areas: 'content';
	}
	.stepContent {
		grid-area: content;
	}
</style>
