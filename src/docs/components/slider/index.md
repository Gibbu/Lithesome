---
title: 'Slider'
description: 'An input where the value is within a set range.'
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
	import { Slider, SliderThumb, SliderRange, SliderValue } from 'lithesome';
</script>

<Slider>
	<SliderRange />
	<SliderThumb />
	<SliderValue />
</Slider>
```

</DocsPage>
