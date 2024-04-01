---
title: 'Select'
description: 'Allow users to chooe from a list of options.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/select.ts';
	import component from '$site/previews/select.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { Select, SelectTrigger, SelectDropdown, SelectOption } from 'lithesome';
</script>

<Select>
	<SelectTrigger>
		<button></button>
	</SelectTrigger>
	<SelectDropdown>
		<SelectOption />
	</SelectDropdown>
</Select>
```

## Multiple selected options

If you need to have a multiple selected at once, change the `value` prop to any form of an array.  
The component will then detect the array and append the selected options.

```svelte
<script>
	import { Select, SelectTrigger, SelectDropdown, SelectOption } from 'lithesome';

	let value = $state([]);
</script>

<Select bind:value>
	<SelectTrigger>
		<button></button>
	</SelectTrigger>
	<SelectDropdown>
		<SelectOption value="hamburger" />
		<SelectOption value="cheeseburger" />
	</SelectDropdown>
</Select>
```

<API {data} />
