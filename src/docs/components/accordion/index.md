---
title: 'Accordion'
description: 'An interactive set of panels that hide and reveal sections.'
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
	import { Accordion, AccordionButton, AccordionContent, AccordionHeading, AccordionItem } from 'lithesome';
</script>

<Accordion>
	<AccordionItem>
		<AccordionHeading>
			<AccordionButton />
		</AccordionHeading/>
		<AccordionContent />
	</AccordionItem>
</Accordion>
```

## Disabling an item

By passing the `disabled` prop, it will disable the item. Disallowing the opening and skipped over via keyboard navigation.

```svelte
<AccordionItem disabled>
	<!-- code here... -->
</AccordionItem>
```

## Allowing a single item opened

If you wish to only allow one `<AccordionItem />` to be opened at a give time, pass the `single` prop to the `<Accordion />` component.

```svelte
<Accordion single>
	<!-- code here... -->
</Accordion>
```

<ComponentAPI data={api} />
