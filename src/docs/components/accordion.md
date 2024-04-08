---
title: 'Accordion'
description: 'An interactive set of panels that hide and reveal sections.'
---

<script>
	import {APITable, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/accordion';
</script>

<Preview {component} {code} />

## Structure

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

<APITable data={api} />
