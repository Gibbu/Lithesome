import { Context, effects } from '$lib/internal/helpers/context.svelte.js';

interface Hooks {
	onChange: (value: string[]) => void;
}
interface Init {
	value: string[];
	disabled: boolean;
}

export class TagsContext extends Context<Hooks> {
	value = $state<string[]>([]);
	disabled = $state<boolean>(false);

	constructor(init: Init, hooks: Hooks) {
		super('tags', hooks);

		this.value = init.value;
		this.disabled = init.disabled;
	}

	#cleanup = effects(() => {
		$effect(() => {
			this.hooks?.onChange(this.value);
		});
	});
}
