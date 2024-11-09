---
title: 'Popover'
description: 'Display content over the window without taking away focus from the current context.'
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
	import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from 'lithesome';
</script>

<Popover>
	<PopoverTrigger>
		<button></button>
	</PopoverTrigger>
	<PopoverContent>
		<PopoverArrow />
	</PopoverContent>
</Popover>
```

<ComponentAPI data={api} />
