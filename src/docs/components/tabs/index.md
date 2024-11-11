---
title: 'Tabs'
description: 'Organize content to sections.'
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
	import { Tabs, TabsList, TabsButton, TabsContent } from 'lithesome';
</script>

<Tabs>
	<TabsList>
		<TabsButton />
	</TabsList>
	<TabsContent />
</Tabs>
```

</DocsPage>
