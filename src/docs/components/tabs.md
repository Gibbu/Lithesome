---
title: 'Tabs'
description: 'Organize content to sections.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/tabs.ts';
	import component from '$site/previews/tabs.svelte';
</script>

<Preview {component} />

## Structure

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

<API {data} />
