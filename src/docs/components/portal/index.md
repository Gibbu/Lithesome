---
title: 'Portal'
description: 'A component or action to mount content from one part of the dom to another.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';

	import api from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<Preview {component} {code} />

## Basic Example

```svelte
<script>
	import { Portal } from 'lithesome';
</script>

<Portal>
	<!-- content... -->
</Portal>
```

## Svelte action

If you don't want to use a whole component, you can use the `usePortal` action.

View the [usePortal](/docs/actions/usePortal) page for more info.

```svelte
<script>
	import { usePortal } from 'lithesome';
</script>

<div use:usePortal>
	<!-- content... -->
</div>
```

<ComponentAPI data={api} />
