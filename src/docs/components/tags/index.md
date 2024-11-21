---
title: 'Tags'
description: 'Display submitted tags one by one.'
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
	import { Tags, TagsDelete, TagsInput, TagsItem } from 'lithesome';

	let tags = $state(['svelte5', 'typescript']);
</script>

<Tags bind:value={tags}>
	{#each tags as tag}
		<TagsItem>
			{tag}
			<TagsDelete />
		</TagsItem>
	{/each}
	<TagsInput />
</Tags>
```

</DocsPage>
