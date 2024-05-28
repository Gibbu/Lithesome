---
title: 'Popover'
description: 'Display content over the window without taking away focus from the current context.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/popover';
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
