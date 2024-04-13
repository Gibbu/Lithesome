---
title: 'API'
description: 'Things you might need to know about Lithesome.'
order: 4
---

## Transition prop

The transition prop allows you to use the inbuilt svelte transition API. albeit a little different.

Each transition "prop" is an array 2 two indexes.

1. The first being the transition itself.
2. And the second being the config you want to use for that transition (which is optional).

```svelte
<SelectContent
	transition={[fly, {y: 15, duration: 150}]}
>
```

Giving an array like the example above will apply both in and out transitions.

But if you wish to use different transitions for both in and out, provide an object with the `in` and `out` properties.

```svelte
<SelectContent
	transition={{
		in: [fly, {y: 15, duration: 150}],
		out: [fly, {y: -15, duration: 200}]
	}}
>
```

<br>

## Use prop

Since we're using components, Svelte doesn't allow the `use` directive. So we gotta "reinvent" it. Thanks to [hperrin/svelte-material-ui](https://github.com/hperrin/svelte-material-ui/blob/master/packages/common/src/internal/useActions.ts) we're able to just that.

Each component has a `use` prop that accepts an array.

```svelte
<script>
	import { myCoolAction, notSoCoolAction } from '$lib';
</script>

<AccordionItem use={[myCoolAction, notSoCoolAction]} />
```

This will pass the action to the underlying element.

But what if we wanna pass a config to the action?  
Simply turn the index into another array with the first index being the action and the second being an object of the config.

```svelte
<script>
	import { myCoolAction, notSoCoolAction } from '$lib';
</script>

<AccordionItem use={[[myCoolAction, { beans: 'burger' }], notSoCoolAction]} />
```

<br>

## Button vs Trigger components

There is a key difference between a Button and Trigger components.

A Button component is exacly that, a button. It renders a HTML `button` element and you style that element directly.

A Trigger component accepts a single HTML node element that the component will use as the "button" per say. All the attributes and events will be passed down to the node element.  
Allowing you to use your own custom components as the "button".
