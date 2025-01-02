---
title: 'Popover'
description: 'Display content over the window without taking away focus from the current context.'
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
	import { Popover, PopoverTrigger, PopoverContent } from 'lithesome';
</script>

<Popover>
	<PopoverTrigger>
		<button>Additional Options</button>
	</PopoverTrigger>
	<PopoverContent>
		<button>Share</button>
		<button>Review</button>
	</PopoverContent>
</Popover>
```

</DocsPage>
