---
title: 'Radio Group'
description: 'Allow users to select a single choice from a list'
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
	import { RadioGroup, RadioGroupItem } from 'lithesome';
</script>

<RadioGroup>
	<RadioGroupItem />
</RadioGroup>
```

<ComponentAPI data={api} />
