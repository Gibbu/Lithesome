---
title: 'Tags'
description: 'Display submitted tags one by one.'
badge: 'new'
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

<ComponentAPI data={api} />
