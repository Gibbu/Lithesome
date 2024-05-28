---
title: 'Tabs'
description: 'Organize content to sections.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/tabs';
</script>

<Preview {component} {code} />

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

<ComponentAPI data={api} />
