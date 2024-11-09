---
title: 'Tags'
description: 'Organize content to sections.'
badge: 'new'
---

<script>
	import {ComponentAPI, Preview} from '$site/index.ts';

	// import api from './api';
	import {default as component} from './component.svelte';
	import {default as code} from './component.svelte?raw';
</script>

<Preview {component} {code} />
