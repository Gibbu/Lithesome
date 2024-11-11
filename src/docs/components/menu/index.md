---
title: 'Menu'
description: 'A menu of items that is hidden until triggered.'
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
	import { Menu, MenuTrigger, MenuContent, MenuItem, MenuArrow } from 'lithesome';
</script>

<Menu>
	<MenuTrigger>
		<button></button>
	</MenuTrigger>
	<MenuContent>
		<MenuArrow />
		<MenuItem />
	</MenuContent>
</Menu>
```

## Disabling an item

By passing the `disabled` prop, it will disable the item. Disallowing clicking and skipped over via keyboard navigation.

```svelte
<MenuItem disabled>
	<!-- code here... -->
</MenuItem>
```

## Site navigation

If you need to navigate to another page via the Content items. Simply pass the link via the `href` prop.

```svelte
<MenuItem href="/@gibbu">
	<!-- code here... -->
</MenuItem>
```

</DocsPage>
