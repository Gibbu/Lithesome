---
title: 'Select'
description: 'Allow users to chooe from a list of options.'
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
	import { Select, SelectTrigger, SelectContent, SelectOption, SelectValue } from '$lib/index.js';

	let value = $state('');
</script>

<Select bind:value>
	<SelectTrigger>
		<button>
			<SelectValue />
		</button>
	</SelectTrigger>
	<SelectContent>
		<SelectOption value="option-1">Option 1</SelectOption>
		<SelectOption value="option-2">Option 2</SelectOption>
	</SelectContent>
</Select>
```

## Multiple selected options

If you need to have a multiple selected at once, change the `value` prop to any form of an array.  
The component will then detect the array and append the selected options.

```svelte
<script>
	import { Select, SelectTrigger, SelectContent, SelectOption } from 'lithesome';

	let value = $state([]);
</script>

<Select bind:value>
	<SelectTrigger>
		<button></button>
	</SelectTrigger>
	<SelectContent>
		<SelectOption value="hamburger" />
		<SelectOption value="cheeseburger" />
	</SelectContent>
</Select>
```

</DocsPage>
