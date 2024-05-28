---
title: 'Select'
description: 'Allow users to chooe from a list of options.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/select';
</script>

<Preview {component} {code} />

## Basic Example

```svelte
<script>
	import { Select, SelectTrigger, SelectContent, SelectOption, SelectArrow } from 'lithesome';
</script>

<Select>
	<SelectTrigger>
		<button>
			<SelectValue />
		</button>
	</SelectTrigger>
	<SelectContent>
		<SelectArrow />
		<SelectOption />
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

<ComponentAPI data={api} />
