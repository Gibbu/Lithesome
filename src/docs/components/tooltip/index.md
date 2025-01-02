---
title: 'Tooltip'
description: 'A popup that displays additonal information	when hovering or focusing an element.'
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
	import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'lithesome';
</script>

<Tooltip>
	<TooltipTrigger>
		<button>Info</button>
	</TooltipTrigger>
	<TooltipContent>
		<TooltipArrow />
		More info
	</TooltipContent>
</Tooltip>
```

## Hovering the tooltip

Hovering the tooltip usually is almost never needed as it's main purpose is to display information and not intended to be intracted with.

If hovering the tooltip is required, I suggest you view the [Hovercard](/docs/components/hovercard) component.  
It'll allow for hovering the content without it disappearing upon hovering.

</DocsPage>
