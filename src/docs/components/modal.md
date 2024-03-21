---
title: 'Modal'
description: 'An overlaying window to take focus away from the current context.'
---

<script>
	import {API, Preview} from '$site/index.ts';
	import data from '$ref/modal.ts';
	import component from '$site/previews/modal.svelte';
</script>

<Preview {component} />

## Structure

```svelte
<script>
	import { Modal, ModalOverlay, ModalContent, ModalTitle, ModalDescription } from 'lithesome';
</script>

<Modal>
	<ModalOverlay />
	<ModalContent>
		<ModalTitle />
		<ModalDescription />
	</ModalContent>
</Modal>
```

<API {data} />
