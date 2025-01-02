---
title: 'Tree'
description: 'A hierarchical list of potentially infinitely nested items.'
badge: 'new'
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
	import { Tree, TreeItem, TreeButton, TreeGroup } from 'lithesome';
</script>

<Tree>
	<TreeItem id="1">
		<TreeButton>Item 1</TreeButton>
	</TreeItem>
	<TreeItem id="2">
		<TreeButton>Item 2</TreeButton>
		<TreeGroup>
			<TreeItem id="2-1">
				<TreeButton>Item 2-1<TreeButton>
			</TreeItem>
			<TreeItem id="2-2">
				<TreeButton>Item 2-2<TreeButton>
			</TreeItem>
		</TreeGroup>
	</TreeItem>
	<TreeItem id="3">
		<TreeButton>Item 3</TreeButton>
	</TreeItem>
</Tree>
```

</DocsPage>
