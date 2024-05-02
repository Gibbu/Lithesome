---
title: 'Modal'
description: 'An overlaying window to take focus away from the current context.'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';
	import {api, component, code} from '$ref/modal';
</script>

<Preview {component} {code} />

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

<ComponentAPI data={api} />
