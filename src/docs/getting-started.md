---
title: 'Getting Started'
description: 'Start using Lithesome in your next project.'
order: 2
---

## Installation

Install using your package manager of your choice.

```
npm install -D lithesome
```

```
pnpm add -D lithesome
```

```
yarn add -D lithesome
```

## Usage

Once installed, you can import them in any `.svelte` file and construct them as you wish.

```svelte
<script>
	import { Menu, MenuTrigger, MenuContent, MenuItem } from 'lithesome';
</script>

<Menu>
	<MenuTrigger>
		<button>Post options</button>
	</MenuTrigger>
	<MenuContent>
		<MenuItem>Edit</MenuItem>
		<MenuItem>Hide</MenuItem>
		<MenuItem>Delete</MenuItem>
	</MenuContent>
</Menu>
```
