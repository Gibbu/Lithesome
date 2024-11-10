---
title: 'Pin Input'
description: 'Allows a sequence of one-character inputs.'
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
	import { Pin, PinInput } from 'lithesome';
</script>

<Pin>
	<PinInput />
	<PinValue />
</Pin>
```

<ComponentAPI data={api} />
