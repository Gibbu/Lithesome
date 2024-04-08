---
title: 'Menu'
description: 'A menu of items that is hidden until triggered.'
---

<script>
	import {APITable, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/menu';
</script>

<Preview {component} {code} />

## Structure

```svelte
<script>
	import { Menu, MenuTrigger, MenuDropdown, MenuItem } from 'lithesome';
</script>

<Menu>
	<MenuTrigger>
		<button></button>
	</MenuTrigger>
	<MenuDropdown>
		<MenuItem />
	</MenuDropdown>
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

If you need to navigate to another page via the dropdown items. Simply pass the link via the `href` prop.

```svelte
<MenuItem href="/@gibbu">
	<!-- code here... -->
</MenuItem>
```

<APITable data={api} />
