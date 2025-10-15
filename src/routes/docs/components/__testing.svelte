<!-- Just a testing component -->
<script lang="ts">
	import { Menu, MenuArrow, MenuContent, MenuItem, MenuTrigger } from '$lib/index.js';
</script>

<Menu>
	<MenuTrigger>Trigger</MenuTrigger>
	<MenuContent>
		<MenuItem>Copy</MenuItem>
		<MenuItem>Edit</MenuItem>
		<MenuItem>Delete</MenuItem>
	</MenuContent>
</Menu>
