> [!WARNING]
> This library is still in very early development. Expect things to be broken.

# Lithesome

An unstyled component library for Svelte 5.

<br>

## Install

```bash
npm i -D lithesome
```

```bash
pnpm i -D lithesome
```

```bash
bun add -D lithesome
```

## Usage

```svelte
<script>
	import { Menu, MenuContent, MenuItem, MenuTrigger } from 'lithesome';
</script>

<Menu>
	<MenuTrigger>Auth</MenuTrigger>
	<MenuContent>
		<MenuItem>My Profile</MenuItem>
		<MenuItem>Account Settings</MenuItem>
		<MenuItem>Logout</MenuItem>
	</MenuContent>
</Menu>
```

<br>

## Docs

View more information at: https://lithesome.dev

## License

See the [LICENSE](https://github.com/Gibbu/lithesome/blob/main/LICENSE.md) file for license rights and limitations (MIT).
