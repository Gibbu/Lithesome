---
title: 'usePortal'
description: 'Mount elements to different parts of the DOM.'
---

<script>
  import {Banner, Preview, ActionAPI} from '$site';
  import {component, code, api} from '$ref/usePortal';
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
