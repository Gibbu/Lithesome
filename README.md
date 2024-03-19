> [!WARNING]
> This library is still in very early development. Expect things to be broken.

# Lithesome

An unstyled component library for Svelte 5.

<br>

## Install

```bash
pnpm i -D lithesome
```

## Usage

```svelte
<script>
	import { Menu, MenuTrigger, MenuDropdown, MenuItem } from 'lithesome';
</script>

<Menu>
	<MenuTrigger>
		<button>Auth</button>
	</MenuTrigger>
	<MenuDropdown>
		<MenuItem>My Profile</MenuItem>
		<MenuItem>Account Settings</MenuItem>
		<MenuItem>Logout</MenuItem>
	</MenuDropdown>
</Menu>
```

<br>

## Docs

View more information at: https://lithesome.dev

## License

See the [LICENSE](https://github.com/Gibbu/lithesome/blob/main/LICENSE.md) file for license rights and limitations (MIT).
