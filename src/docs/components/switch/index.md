---
title: 'Switch'
description: 'A controlled element to represent "on" and "off" states.'
---

<script>
	import {DocsPage} from '$site/index.ts';

	import componentAPI from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<DocsPage {component} {code} {componentAPI}>

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

</DocsPage>
