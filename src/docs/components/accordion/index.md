---
title: 'Accordion'
description: 'An interactive set of panels that hide and reveal sections.'
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
	import { Accordion, AccordionButton, AccordionContent, AccordionHeading, AccordionItem } from 'lithesome';
</script>

<Accordion>
	<AccordionItem>
		<AccordionHeading>
			<AccordionButton>Item 1</AccordionButton>
		</AccordionHeading/>
		<AccordionContent>Item 1 content</AccordionContent>
	</AccordionItem>
	<AccordionItem>
		<AccordionHeading>
			<AccordionButton>Item 2</AccordionButton>
		</AccordionHeading/>
		<AccordionContent>Item 2 content</AccordionContent>
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

</DocsPage>
