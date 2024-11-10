---
title: 'Toast'
description: 'Display a temporary message.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';

	import api from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<Preview {component} {code} />

## Basic Example

```svelte
<script>
	import { Toaster, Toast, ToastTitle, ToastMessage } from 'lithesome';
</script>

<Toaster>
	{#snippet children(toasts)}
		{#each toasts as toast (toast.id)}
			<Toast>
				<ToastTitle />
				<ToastMessage />
			</Toast>
		{/each}
	{/snippet}
</Toaster>
```

> Be sure to key your each block!

## Adding a toast

To actually use the toasts, use the `toaster` object.

By using the `add` method, it will add a toast to the toaster.

```svelte
<script>
	import { toaster } from 'lithesome';

	const addToast = () => {
		toaster.add('success', {
			title: 'Profile updated.',
			message: 'Your profile details have been updated.'
		});
	};
</script>

<button onclick={addToast}>Add toast</button>
```

## Dismissing a toast early

Using the `removeById` allows you remove a singular toast early.

```svelte
<script>
	import { toaster, Toaster, Toast, ToastTitle, ToastMessage } from 'lithesome';
</script>

<Toaster>
	{#snippet children(toasts)}
		{#each toasts as toast (toast.id)}
			<Toast>
				<ToastTitle />
				<ToastMessage />
				{#if toast.config.dismissable}
					<button onclick={() => toaster.removeById(toast.id)}>x</button>
				{/if}
			</Toast>
		{/each}
	{/snippet}
</Toaster>
```

<ComponentAPI data={api} />
