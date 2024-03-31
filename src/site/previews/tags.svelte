<script lang="ts">
	import { Tags, TagsInput, TagsItem, TagsDelete } from '$lib/index.js';

	let value = $state<string[]>([]);
	let disabled = $state<boolean>(false);
</script>

{#if !disabled}
	<Tags bind:value bind:disabled>Hi there</Tags>
{/if}

<br />

<button
	onclick={() => {
		value = [...value, 'hi there'];
	}}>value</button
>
<br />
<button onclick={() => (disabled = !disabled)}>disabled</button>
