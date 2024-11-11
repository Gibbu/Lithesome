---
title: 'usePortal'
description: 'Mount elements to different parts of the DOM.'
---

<script>
	import {DocsPage, Banner} from '$site/index.ts';

	import actionAPI from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<DocsPage {component} {code} {actionAPI}>

## Basic Example

```svelte
<script>
	import { usePortal } from 'lithesome';
</script>

<div use:usePortal={'#layers'}>
	<!-- content... -->
</div>
```

</DocsPage>
