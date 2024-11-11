---
title: 'Hover Card'
description: 'Display a summary/preview of a link.'
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
	import { Hovercard, HovercardTrigger, HovercardContent, HovercardArrow } from 'lithesome';
</script>

<Hovercard>
	<HovercardTrigger>
		<button></button>
	</HovercardTrigger>
	<HovercardContent>
		<HovercardArrow />
	</HovercardContent>
</Hovercard>
```

## Delaying visiblity of the content

If you wish have different delays between the opening and closing of the content, pass the `delay` prop to the `Hovercard` component.

Passing a number will set both in and out delays. Passing an array of 2 indexes will set the in and out separately.

```svelte
<Hovercard delay={[1000, 0]}>
	<HovercardTrigger>
		<button></button>
	</HovercardTrigger>
	<HovercardContent />
</Hovercard>
```

</DocsPage>
