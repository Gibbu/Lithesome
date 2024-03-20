---
title: 'Checkbox'
description: 'Allow users to check and uncheck things.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/checkbox.ts';
	import component from '$site/previews/checkbox.svelte';
</script>

<Preview {component} />

## Native Input element

Since the `<Checkbox />` component is rendering a button, you cannot use it for native form submissions.

If you want to use a native `<input />` checkbox for forms, simply bind the checked from the button to the input.

```svelte
<script>
	import { Checkbox } from 'lithesome';

	let checked = $state(false);
</script>

<form action="?/update" method="POST">
	<Checkbox bind:checked />

	<input type="checkbox" hidden bind:checked />

	<button type="submit">Submit</button>
</form>
```

<API {data} />
