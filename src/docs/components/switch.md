---
title: 'Switch'
description: 'A controlled element to represent "on" and "off" states.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/switch';
</script>

<Preview {component} {code} />

## Basic Example

```svelte
<script>
	import { Switch } from 'lithesome';
</script>

<Switch />
```

## Native Input element

Since the `<Switch />` component is rendering a button, you cannot use it for native form submissions.

If you want to use a native `<input />` checkbox for forms, simply bind the checked from the button to the input.

```svelte
<script>
	import { Switch } from 'lithesome';

	let checked = $state(false);
</script>

<form action="?/update" method="POST">
	<Switch bind:checked />

	<input type="checkbox" hidden bind:checked />

	<button type="submit">Submit</button>
</form>
```

<ComponentAPI data={api} />
