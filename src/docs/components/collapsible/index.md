---
title: 'Collapsible'
description: 'Toggle content sections.'
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
	import { Collapsible, CollapsibleButton, CollapsibleContent } from 'lithesome';
</script>

<Collapsible>
	<CollapsibleButton />
	<CollapsibleContent />
</Collapsible>
```

</DocsPage>
