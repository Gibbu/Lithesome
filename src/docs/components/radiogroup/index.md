---
title: 'Radio Group'
description: 'Allow users to select a single choice from a list'
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
	import { RadioGroup, RadioGroupItem } from 'lithesome';

	let value = $state('dark');
</script>

<RadioGroup>
	<RadioGroupItem value="light">Light mode</RadioGroupItem>
	<RadioGroupItem value="dark">Dark mode</RadioGroupItem>
</RadioGroup>
```

</DocsPage>
