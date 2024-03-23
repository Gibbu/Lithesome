---
title: 'Styling'
description: 'Style the Lithesome components.'
order: 3
---

Lithesome components come completely unstyled out of the box, leaving that problem to you.

There are a few ways to style each component.

## CSS Frameworks/libraries

If you're using a CSS framework/library, simply pass their classes via the `class` prop of each component.

```svelte
<MenuItem class="bg-red-400 text-lime-500">Edit</MenuItem>
<MenuItem class="bg-red-400 text-lime-500">Hide</MenuItem>
<MenuItem class="bg-red-400 text-lime-500">Delete</MenuItem>
```

<br>

## Data attributes

Each component has their own unqiue html `[data]` applied to the underlying element. Simply target that attribute in your global css.

```svelte
<MenuItem>Edit</MenuItem>
<MenuItem>Hide</MenuItem>
<MenuItem>Delete</MenuItem>
```

```css
[data-menuitem] {
	background: red;
	color: lime;
}
```

To figure out what the data attribute is called, look at the component, add `data` infront and make them all lowercase.

`<MenuDropdown>` = `[data-menudropdown]`  
`<SelectOption>` = `[data-selectoption]`  
ect...

<br>

## CSS Selectors

if data attributes aren't your cup of tea, you can always create your own classes and then apply them to the components.

```svelte
<MenuItem class="menu-item">Edit</MenuItem>
<MenuItem class="menu-item">Hide</MenuItem>
<MenuItem class="menu-item">Delete</MenuItem>
```

```css
.menu-item {
	background: red;
	color: lime;
}
```

<br>

## Styling component states.

Most components have some sort of "state" to tell the browser what is checked, selected, opened, ect...  
You have a couple of ways of style them accordingly.

### `[data-attributes]`

Whenever there's a "state" that is controlled by the components, they are exposed using `[data]` attributes.

For example:

- `[data-hovered]` is exposed on the `<MenuItem />` when the user has hovered over it, via mouse or keyboard.
- `[data-state="opened"]` is exposed on the `<Menu />` when the dropdown of that menu is visible.

Check each component API reference to see what data attributes are exposed on each slot.

<br>

### `class` prop function.

Each `class` prop exposed by the Lithesome components can be used as a function, giving you each state as a destructured parameter (if needed and exposed).

```svelte
<SelectOption
	value="bobross"
	class={({ hovered, selected }) =>
		clsx(
			hovered && !selected ? 'bg-lime-400' : '',
			selected ? 'bg-teal-500' : '',
			'rounded-md px-4 py-2 text-xs font-medium'
		)}
>
	Bob Ross
</SelectOption>
```

> This example uses [clsx](https://github.com/lukeed/clsx) which is not required, but makes using the class function much easier to use.

> NOTE: You cannot use these destructured props outside the `class` prop. They do not leave their scope.

<br>

### Child props

With Svelte 5 [slots](https://svelte.dev/docs/special-elements#slot) have been replaced by [Snippets](https://svelte-5-preview.vercel.app/docs/snippets).  
This means you can no longer do `let:prop` on the component itself, but rather use a `{#snippet children()}` block to expose those props.

```svelte
<SelectOption value="bobross">
	{#snippet children({ hovered, selected })}
		<span class={hovered ? 'ml-2' : ''}>Bob Ross</span>
		{#if selected}
			<CheckMarkIcon />
		{/if}
	{/snippet}
</SelectOption>
```

> It's not the nicest looking, but it apparently solves a lot of issues internally for svelte itself.
