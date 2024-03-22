---
title: 'Popover'
description: 'Display content over the window without taking away focus from the current context.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/popover.ts';
	import component from '$site/previews/popover.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { Popover, PopoverTrigger, PopoverContent } from 'lithesome';
</script>

<Popover>
	<PopoverTrigger>
		<button></button>
	</PopoverTrigger>
	<PopoverContent />
</Popover>
```

<API {data} />
