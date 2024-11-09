---
title: 'Slider'
description: 'An input where the value is within a set range.'
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
	import { Slider, SliderThumb, SliderRange, SliderValue } from 'lithesome';
</script>

<Slider>
	<SliderRange />
	<SliderThumb />
	<SliderValue />
</Slider>
```

<ComponentAPI data={api} />
