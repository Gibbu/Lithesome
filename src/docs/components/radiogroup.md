---
title: 'Radio Group'
description: 'Allow users to select a single choice from a list'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/radiogroup.ts';
	import component from '$site/previews/radiogroup.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { RadioGroup, RadioGroupItem } from 'lithesome';
</script>

<RadioGroup>
	<RadioGroupItem />
</RadioGroup>
```

<API {data} />
