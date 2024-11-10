---
title: 'usePortal'
description: 'Mount elements to different parts of the DOM.'
---

<script>
	import {ComponentAPI, Preview, ActionAPI} from '$site/index.ts';

	import api from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<Preview {component} {code} />

## Basic Example

```svelte
<script>
	import { usePortal } from 'lithesome';
</script>

<div use:usePortal={'#layers'}>
	<!-- content... -->
</div>
```

<ActionAPI data={api} />
