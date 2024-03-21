---
title: 'Pin Input'
description: 'Allows a sequence of one-character inputs.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/pin.ts';
	import component from '$site/previews/pin.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { Pin, PinInput } from 'lithesome';
</script>

<Pin>
	<PinInput />
</Pin>
```

<API {data} />
