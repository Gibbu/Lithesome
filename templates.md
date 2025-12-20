## Just my quick copy/paste default templates

`state.svelte.ts`

```ts
import { buildContext, createAttributes } from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type { RadioGroupItemProps, RadioGroupProps } from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('radiogroup', ['root', 'item']);

//
// ~ROOT
//
type RootProps = GetInternalProps<RadioGroupProps>;
class RadioGroupRoot {
	$id: RootProps['id'];

	constructor(props: RootProps) {
		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.root]: ''
	}));
	state = $derived.by(() => ({}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(RadioGroupRoot);

export const createRadioGroupRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};
```

---

`components/types`

```ts
import type { Props } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface RadioGroupProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~ITEM
//
export interface RadioGroupItemProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}
```

---

`ComponentItem.svelte`

```svelte
<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalContent } from './state.svelte.js';

	import type { ModalContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useModalContent({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
```
