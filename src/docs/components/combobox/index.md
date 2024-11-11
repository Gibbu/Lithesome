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
	import { Combobox, ComboboxInput, ComboboxContent, ComboboxOption, ComboboxArrow } from 'lithesome';
</script>

<Combobox>
	<ComboboxInput />
	<ComboboxContent>
		<ComboboxArrow />
		<ComboboxOption />
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
