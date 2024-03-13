---
title: 'API'
description: 'Things you might need to know about Lithesome.'
order: 4
---

## `transition` prop.

The transition prop allows you to use the inbuilt svelte transition API. albeit a little different.

Each transition "prop" is an array 2 two indexes.

1. The first being the transition itself.
2. And the second being the config you want to use for that transition (which is optional).

```svelte
<SelectDropdown
	transition={[fly, {y: 15, duration: 150}]}
>
```

Giving a single array like the example above will apply both in and out transitions.

But if you wish to use different transitions for both in and out, provide an object with the `in` and `out` properties.

```svelte
<SelectDropdown
	transition={{
		in: [fly, {y: 15, duration: 150}],
		out: [fly, {y: -15, duration: 200}]
	}}
>
```
