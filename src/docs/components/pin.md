---
title: 'Pin Input'
description: 'Allows a sequence of one-character inputs.'
---

<script>
	import {APITable, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/pin';
</script>

<Preview {component} {code} />

## Structure

```svelte
<script>
	import { Pin, PinInput } from 'lithesome';
</script>

<Pin>
	<PinInput />
</Pin>
```

<APITable data={api} />
