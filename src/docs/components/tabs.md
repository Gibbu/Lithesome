---
title: 'Tabs'
description: 'Organize content to sections.'
---

<script>
	import {APITable, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/tabs';
</script>

<Preview {component} {code} />

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

<APITable data={api} />
