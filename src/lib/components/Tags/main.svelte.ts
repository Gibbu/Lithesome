import { buildContext, createUID, KEYS, type StateValues } from '$internal';

import type { TagsDeleteEvents, TagsInputEvents, TagsRootInternalProps } from './types.js';

//
// Root
//
type TagsRootProps = StateValues<TagsRootInternalProps>;
class TagsRoot {
	uid = createUID('tags');

	$value: TagsRootProps['value'];
	$disabled: TagsRootProps['disabled'];
	$max: TagsRootProps['max'];
	$whitelist: TagsRootProps['whitelist'];
	$blacklist: TagsRootProps['blacklist'];

	invalid = $state<boolean>(false);

	constructor(props: TagsRootProps) {
		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$max = props.max;
		this.$whitelist = props.whitelist;
		this.$blacklist = props.blacklist;
	}

	#allowedTag = (tag: string) => {
		return this.$value.val.includes(tag) ||
			(this.$whitelist.val.length > 0 && !this.$whitelist.val.includes(tag)) ||
			(this.$blacklist.val.length > 0 && this.$blacklist.val.includes(tag))
			? false
			: true;
	};

	addTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (!this.#allowedTag(tag)) {
			this.invalid = true;
			return false;
		}

		this.$value.val = [...this.$value.val, tag];

		return true;
	};

	removeTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (this.$value.val.includes(tag)) this.$value.val = this.$value.val.filter((el) => el !== tag);
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-tags': '',
				'data-disabled': this.$disabled.val
			}) as const
	);
	state = $derived.by(() => ({
		disabled: this.$disabled.val
	}));
}

//
// Input
//
class TagsInput {
	root: TagsRoot;
	#events: TagsInputEvents;

	constructor(root: TagsRoot, events: TagsInputEvents) {
		this.root = root;
		this.#events = events;
	}

	#handleKeydown: TagsInputEvents['onKeydown'] = async (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (
			key === KEYS.enter &&
			e.currentTarget.value.trim().length > 0 &&
			this.root.addTag(e.currentTarget.value.trim())
		) {
			e.currentTarget.value = '';
		}

		// TODO: add keyboard navigation
	};

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('input'),
				type: 'text',
				onkeydown: this.#handleKeydown
			}) as const
	);
}

//
// Delete
//
type TagsDeleteProps = StateValues<{
	tag: string;
}>;
class TagsDelete {
	root: TagsRoot;
	#events: TagsDeleteEvents;

	$tag: TagsDeleteProps['tag'];

	constructor(root: TagsRoot, props: TagsDeleteProps, events: TagsDeleteEvents) {
		this.root = root;
		this.#events = events;

		this.$tag = props.tag;
	}

	#handleClick: TagsDeleteEvents['onClick'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onClick?.(e);

		this.root.removeTag(this.$tag.val);
	};

	attrs = $derived.by(
		() =>
			({
				type: 'button',
				onclick: this.#handleClick
			}) as const
	);
}

//
// Builders
//
const rootContext = buildContext(TagsRoot);

export const createRootContext = (props: TagsRootProps) => {
	return rootContext.createContext(props);
};

export const useTagsInput = (events: TagsInputEvents) => {
	return rootContext.register(TagsInput, events);
};

export const useTagsDelete = (props: TagsDeleteProps, events: TagsDeleteEvents) => {
	return rootContext.register(TagsDelete, props, events);
};
