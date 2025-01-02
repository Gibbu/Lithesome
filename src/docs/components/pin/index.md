---
title: 'Pin Input'
description: 'Allows a sequence of one-character inputs.'
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
	import { Pin, PinInput } from 'lithesome';
</script>

<Pin>
	<PinInput />
	<PinInput />
	<PinInput />
	<PinInput />
</Pin>
```

</DocsPage>
