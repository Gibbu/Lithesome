---
title: 'Modal'
description: 'An overlaying window to take focus away from the current context.'
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

<ComponentAPI data={api} />
