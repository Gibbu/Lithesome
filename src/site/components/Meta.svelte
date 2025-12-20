<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title?: string;
		description?: string;
	}

	let { title, description }: Props = $props();

	const config = {
		name: 'Lithesome',
		description: 'An unstyled component library for Svelte 5.',
		url: 'https://lithesome.dev',
		author: 'Gibbu',
		keywords: `Svelte,Svelte 5,SvelteKit,Svelte Runes,Svelte Components,Unstyled Svelte Components,Headless Svelte Components`
	};

	const fullTitle = $derived(title ? `${title} - ${config.name}` : config.name);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description ?? config.description} />
	<meta name="keywords" content={config.keywords} />
	<meta name="author" content={config.author} />
	<meta name="twitter:site" content={config.url} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description ?? config.description} />
	<meta name="twitter:creator" content={config.author} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={config.url + page.url.pathname} />
	<meta property="og:description" content={description ?? config.description} />
	<meta property="og:site_name" content={config.name} />
</svelte:head>
