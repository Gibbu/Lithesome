---
title: 'Popover'
description: 'Display content over the window without taking away focus from the current context.'
---

<script>
	import {APITable, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/popover';
</script>

<Preview {component} {code} />

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

<APITable data={api} />
