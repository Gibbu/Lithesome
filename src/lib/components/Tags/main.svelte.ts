import { buildContext, createUID, KEYS, PREVENT_KEYS, useEffects, type StateValue, type StateValues } from '$internal';
import type { TagsDeleteEvents, TagsInputEvents, TagsRootEvents } from './types.js';

//
// Root
//
type TagsRootProps = StateValues<{
	value: string[];
	disabled: boolean;
	max: number;
	whitelist: string[];
	blacklist: string[];
}>;
class TagsRoot {
	uid = createUID('tags');
	#events: TagsRootEvents;

	$value: TagsRootProps['value'];
	$disabled: TagsRootProps['disabled'];
	$max: TagsRootProps['max'];
	$whitelist: TagsRootProps['whitelist'];
	$blacklist: TagsRootProps['blacklist'];

	invalid = $state<boolean>(false);
	input: StateValue<HTMLInputElement | undefined> = { val: undefined };

	index = $state<number>(-1);

	SelectedTag = $derived.by(() => (this.index !== -1 ? this.$value.val[this.index] : null));

	constructor(props: TagsRootProps, events: TagsRootEvents) {
		this.#events = events;

		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$max = props.max;
		this.$whitelist = props.whitelist;
		this.$blacklist = props.blacklist;

		useEffects(() => {
			$effect(() => {
				console.log(this.index);
				if (this.index > this.$value.val.length - 1) this.index = -1;
			});
		});
	}

	#allowedTag = (tag: string) => {
		if (tag.trim().length === 0) return false;
		else if (this.$max.val !== 0 && this.$value.val.length >= this.$max.val) return false;
		else if (this.$value.val.includes(tag)) return false;
		else if (this.$blacklist.val.length && this.$blacklist.val.includes(tag)) return false;
		else if (this.$whitelist.val.length && !this.$whitelist.val.includes(tag)) return false;
		else return true;
	};

	addTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (!this.#allowedTag(tag)) {
			this.invalid = true;
			return false;
		}

		this.$value.val = [...this.$value.val, tag.trim()];

		return true;
	};

	removeTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (this.$value.val.includes(tag)) {
			this.$value.val = this.$value.val.filter((el) => el !== tag);
		}
	};

	#handleClick: TagsRootEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		if (e.target === e.currentTarget) {
			this.input.val?.focus();
		}
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-tags': '',
		onclick: this.#handleClick
	}));
}

//
// Input
//
type TagsInputProps = StateValues<{
	input: HTMLInputElement | undefined;
}>;
class TagsInput {
	root: TagsRoot;
	#events: TagsInputEvents;

	constructor(root: TagsRoot, props: TagsInputProps, events: TagsInputEvents) {
		this.root = root;
		this.#events = events;

		this.root.input = props.input;
	}

	#handleKeydown: TagsInputEvents['onKeydown'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onKeydown?.(e);
		const cursor = e.currentTarget.selectionStart || 0;

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) this.root.invalid = false;
		if (key === KEYS.enter && this.root.addTag(e.currentTarget.value)) e.currentTarget.value = '';

		if (!PREVENT_KEYS.includes(key) && this.root.index !== -1) this.root.index = -1;

		if ((key === KEYS.arrowLeft && cursor === 0) || (key === KEYS.arrowRight && this.root.SelectedTag))
			e.preventDefault();

		if (cursor === 0) {
			if (key === KEYS.arrowLeft) {
				if (this.root.index === -1) this.root.index = this.root.$value.val.length - 1;
				else if (this.root.index !== 0) this.root.index -= 1;
			}
			if (key === KEYS.arrowRight && this.root.index !== -1) {
				this.root.index += 1;
			}

			if (key === KEYS.backspace) {
				if (this.root.index === -1) this.root.index = this.root.$value.val.length - 1;
				else if (this.root.index !== -1 && this.root.SelectedTag) {
					this.root.removeTag(this.root.SelectedTag);
					if (this.root.index !== 0) this.root.index -= 1;
				}
			}

			if (key === KEYS.delete && this.root.SelectedTag) this.root.removeTag(this.root.SelectedTag);
		}
	};
	#handleInput: TagsInputEvents['onInput'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onInput?.(e);

		const target = e.target as HTMLInputElement;

		if (target.value.trim().length === 0) this.root.invalid = false;
	};
	#handleBlur: TagsInputEvents['onBlur'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onBlur?.(e);

		this.root.index = -1;
		this.root.invalid = false;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('input'),
				type: 'text',
				'data-invalid': this.root.invalid || undefined,
				'data-tagsinput': '',
				onblur: this.#handleBlur,
				onkeydown: this.#handleKeydown,
				oninput: this.#handleInput
			}) as const
	);

	state = $derived.by(() => ({
		invalid: this.root.invalid
	}));
}

//
// Item
//
type TagsItemProps = StateValues<{
	value: string;
}>;
class TagsItem {
	uid = createUID('item');
	root: TagsRoot;

	$value: TagsItemProps['value'];

	Active = $derived.by(() => this.root.SelectedTag === this.$value.val);

	editing = $state<boolean>(false);

	constructor(root: TagsRoot, props: TagsItemProps) {
		this.root = root;

		this.$value = props.value;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-tagsitem': ''
			}) as const
	);
	state = $derived.by(() => ({
		active: this.Active
	}));
}

//
// Delete
//
type TagsDeleteProps = StateValues<{
	value: string;
}>;
class TagsDelete {
	root: TagsRoot;
	#events: TagsDeleteEvents;

	$value: TagsDeleteProps['value'];

	constructor(root: TagsRoot, props: TagsDeleteProps, events: TagsDeleteEvents) {
		this.root = root;
		this.#events = events;

		this.$value = props.value;
	}

	#handleClick: TagsDeleteEvents['onClick'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onClick?.(e);

		this.root.removeTag(this.$value.val);
	};

	attrs = $derived.by(
		() =>
			({
				type: 'button',
				tabindex: -1,
				onclick: this.#handleClick
			}) as const
	);
}

//
// Builders
//
const rootContext = buildContext(TagsRoot);

export const createTagsRootContext = (props: TagsRootProps, events: TagsRootEvents) => {
	return rootContext.createContext(props, events);
};

export const useTagsInput = (props: TagsInputProps, events: TagsInputEvents) => {
	return rootContext.register(TagsInput, props, events);
};

export const useTagsItem = (props: TagsItemProps) => {
	return rootContext.register(TagsItem, props);
};

export const useTagsDelete = (props: TagsDeleteProps, events: TagsDeleteEvents) => {
	return rootContext.register(TagsDelete, props, events);
};
