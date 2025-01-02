---
title: 'Modal'
description: 'An overlaying window to take focus away from the current context.'
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
	import { Modal, ModalOverlay, ModalContent, ModalTitle, ModalDescription } from 'lithesome';

	let visible = $state(false);
</script>

<button onclick={() => (visible = !visible)}> Toggle modal </button>

<Modal bind:visible>
	<ModalOverlay />
	<ModalContent>
		<ModalTitle>Title</ModalTitle>
		<ModalDescription>Modal content that could contain anything.</ModalDescription>
	</ModalContent>
</Modal>
```

</DocsPage>
