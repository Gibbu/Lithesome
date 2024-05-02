---
title: 'Radio Group'
description: 'Allow users to select a single choice from a list'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/radiogroup';
</script>

<Preview {component} {code} />

## Structure

```svelte
<script>
	import { RadioGroup, RadioGroupItem } from 'lithesome';
</script>

<RadioGroup>
	<RadioGroupItem />
</RadioGroup>
```

<ComponentAPI data={api} />
