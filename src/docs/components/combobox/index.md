---
title: 'Combobox'
description: 'Allow users to choose from a list of options with search filtering functionality.'
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
	import { Combobox, ComboboxContent, ComboboxInput, ComboboxOption } from '$lib/index.js';

	let query = $state('Option 1');
	let value = $state('option-1');
	let touched = $state(false);
	let label = $state('');

	const items = [
		{ value: 'option-1', label: 'Option 1' },
		{ value: 'option-2', label: 'Option 2' },
		{ value: 'option-3', label: 'Option 3' }
	];

	const filteredItems = $derived(
		touched
			? items.filter(
					(item) =>
						item.value.toLowerCase().includes(query.toLowerCase()) ||
						item.label.toLowerCase().includes(query.toLowerCase())
				)
			: items
	);
</script>

<Combobox
	bind:value
	bind:touched
	bind:label
	onChange={(payload) => {
		if (payload?.label) query = payload.label;
	}}
>
	<ComboboxInput bind:value={query}></ComboboxInput>
	<ComboboxContent>
		{#each filteredItems as { value, label } (value)}
			<ComboboxOption {value}>{label}</ComboboxOption>
		{/each}
	</ComboboxContent>
</Combobox>
```

## Multiple selected options

If you need to have a multiple selected at once, change the `value` prop to any form of an array.  
The component will then detect the array and append the selected options.

```svelte
<script>
	import { Combobox, ComboboxInput, ComboboxContent, ComboboxOption } from 'lithesome';

	let value = $state([]);
	let query = $state('');
</script>

<Combobox bind:value>
	<ComboboxInput bind:query />
	<ComboboxContent>
		<ComboboxOption value="hamburger" />
		<ComboboxOption value="cheeseburger" />
	</ComboboxContent>
</Combobox>
```

</DocsPage>
