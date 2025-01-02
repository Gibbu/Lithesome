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
		<TabsButton value="1">Tab 1</TabsButton>
		<TabsButton value="2">Tab 2</TabsButton>
	</TabsList>
	<TabsContent value="1">Tab content 1</TabsContent>
	<TabsContent value="2">Tab content 2</TabsContent>
</Tabs>
```

</DocsPage>
