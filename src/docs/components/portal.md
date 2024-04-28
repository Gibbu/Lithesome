---
title: 'Portal'
description: 'A component or action to mount content from one part of the dom to another.'
badge: 'new'
---

<script>
	import {APITable, Preview, Banner} from '$site/index.ts';
	import {api, component, code} from '$ref/portal';
</script>

<Preview {component} {code} />

## Structure

```svelte
<script>
	import { Portal } from 'lithesome';
</script>

<Portal>
	<!-- content... -->
</Portal>
```

## Svelte action

If you don't want to use a whole component, you can use the `portal` action.

```svelte
<script>
	import { portal } from 'lithesome';
</script>

<div use:portal>
	<!-- content... -->
</div>
```

<Banner type="info">
	The lowercased "portal" is the svelte action, while the capitalized "Portal" is the component.
</Banner>

<APITable data={api} />
