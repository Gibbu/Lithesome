---
title: 'Combobox'
description: 'Allow users to choose from a list of options with search filtering functionality.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/combobox.ts';
	import component from '$site/previews/combobox.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { Combobox, ComboboxInput, ComboboxDropdown, ComboboxOption } from 'lithesome';
</script>

<Combobox>
	<ComboboxInput />
	<ComboboxDropdown>
		<ComboboxOption />
	</ComboboxDropdown>
</Combobox>
```

## Multiple selected options

If you need to have a multiple selected at once, change the `value` prop to any form of an array.  
The component will then detect the array and append the selected options.

```svelte
<script>
	import { Combobox, ComboboxInput, ComboboxDropdown, ComboboxOption } from 'lithesome';

	let value = $state([]);
	let query = $state('');
</script>

<Combobox bind:value>
	<ComboboxInput bind:query />
	<ComboboxDropdown>
		<ComboboxOption value="hamburger" />
		<ComboboxOption value="cheeseburger" />
	</ComboboxDropdown>
</Combobox>
```

<API {data} />
