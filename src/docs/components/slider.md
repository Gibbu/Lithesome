---
title: 'Slider'
description: 'An input where the value is within a set range.'
badge: 'new'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/slider';
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
