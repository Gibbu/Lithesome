---
title: 'useOutside'
description: 'Run a callback when an event has triggered outside the node.'
badge: 'new'
---

<script>
  import {Banner, Preview, ActionAPI} from '$site';
  import {component, code, api} from '$ref/useOutside';
</script>

<Preview {component} {code} />

```svelte
<script>
	import { useOutside } from 'lithesome';
</script>

<div
	use:useOutside={{
		callback() {
			alert('outside');
		}
	}}
>
	<!-- content... -->
</div>
```

## Excluding elements

If you want to exlude elements from triggering the callback, pass those elements to the `exclude` property.

```svelte
<script>
	import { useOutside } from 'lithesome';

	let visible = $state(false);
	let btn = $state(null);
</script>

<button bind:this={btn} onclick={() => (visible = !visible)}>Toggle</button>

{#if visible}
	<div
		use:useOutside={{
			callback() {
				visible = false;
			},
			exlude: btn
		}}
	>
		<!-- content... -->
	</div>
{/if}
```

<Banner type="info">
  The "exclude" property can take either a singular element or an array of elements.
</Banner>

## Event

The default event to run the callback is `click`. But you can change this by passing the `on` property.

```svelte
<script>
	import { useOutside } from 'lithesome';
</script>

<div
	use:useOutside={{
		callback() {
			alert('outside');
		},
		on: 'mouseleave'
	}}
>
	<!-- content... -->
</div>
```

<ActionAPI data={api} />
