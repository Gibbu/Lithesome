import { buildContext, createUID, KEYS, PREVENT_KEYS, type StateValue, type StateValues } from '$internal';
import type {
	TagsDeleteEvents,
	TagsInputEvents,
	TagsInputState,
	TagsItemState,
	TagsRootEvents,
	TagsState
} from './types.js';

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

		$effect(() => {
			if (this.index > this.$value.val.length - 1) this.index = -1;
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
		'data-activetag': this.SelectedTag || undefined,
		onclick: this.#handleClick
	}));

	state = $derived.by<TagsState>(() => ({
		activeTag: !!this.SelectedTag || undefined
	}));
}

//
// Input
//
type TagsInputProps = StateValues<{
	input: HTMLInputElement | undefined;
}>;
class TagsInput {
	_root: TagsRoot;
	#events: TagsInputEvents;

	constructor(_root: TagsRoot, props: TagsInputProps, events: TagsInputEvents) {
		this._root = _root;
		this.#events = events;

		this._root.input = props.input;
	}

	#handleKeydown: TagsInputEvents['onKeydown'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onKeydown?.(e);
		const cursor = e.currentTarget.selectionStart || 0;

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) this._root.invalid = false;
		if (key === KEYS.enter && this._root.addTag(e.currentTarget.value)) e.currentTarget.value = '';

		if (!PREVENT_KEYS.includes(key) && this._root.index !== -1) this._root.index = -1;

		if ((key === KEYS.arrowLeft && cursor === 0) || (key === KEYS.arrowRight && this._root.SelectedTag))
			e.preventDefault();

		if (cursor === 0) {
			if (key === KEYS.arrowLeft) {
				if (this._root.index === -1) this._root.index = this._root.$value.val.length - 1;
				else if (this._root.index !== 0) this._root.index -= 1;
			}
			if (key === KEYS.arrowRight && this._root.index !== -1) {
				this._root.index += 1;
			}

			if (key === KEYS.backspace) {
				if (this._root.index === -1) this._root.index = this._root.$value.val.length - 1;
				else if (this._root.index !== -1 && this._root.SelectedTag) {
					this._root.removeTag(this._root.SelectedTag);
					if (this._root.index !== 0) this._root.index -= 1;
				}
			}

			if (key === KEYS.delete && this._root.SelectedTag) this._root.removeTag(this._root.SelectedTag);
		}
	};
	#handleInput: TagsInputEvents['onInput'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onInput?.(e);

		const target = e.target as HTMLInputElement;

		if (target.value.trim().length === 0) this._root.invalid = false;
	};
	#handleBlur: TagsInputEvents['onBlur'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onBlur?.(e);

		this._root.index = -1;
		this._root.invalid = false;
	};

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('input'),
				type: 'text',
				'data-invalid': this._root.invalid || undefined,
				'data-tagsinput': '',
				onblur: this.#handleBlur,
				onkeydown: this.#handleKeydown,
				oninput: this.#handleInput
			}) as const
	);

	state = $derived.by<TagsInputState>(() => ({
		invalid: this._root.invalid
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
	_root: TagsRoot;

	$value: TagsItemProps['value'];

	Active = $derived.by(() => this._root.SelectedTag === this.$value.val);

	editing = $state<boolean>(false);

	constructor(_root: TagsRoot, props: TagsItemProps) {
		this._root = _root;

		this.$value = props.value;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-tagsitem': ''
			}) as const
	);
	state = $derived.by<TagsItemState>(() => ({
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
	_root: TagsRoot;
	#events: TagsDeleteEvents;

	$value: TagsDeleteProps['value'];

	constructor(_root: TagsRoot, props: TagsDeleteProps, events: TagsDeleteEvents) {
		this._root = _root;
		this.#events = events;

		this.$value = props.value;
	}

	#handleClick: TagsDeleteEvents['onClick'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.removeTag(this.$value.val);
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
const _rootContext = buildContext(TagsRoot);

export const createTagsRootContext = (props: TagsRootProps, events: TagsRootEvents) => {
	return _rootContext.createContext(props, events);
};

export const useTagsInput = (props: TagsInputProps, events: TagsInputEvents) => {
	return _rootContext.register(TagsInput, props, events);
};

export const useTagsItem = (props: TagsItemProps) => {
	return _rootContext.register(TagsItem, props);
};

export const useTagsDelete = (props: TagsDeleteProps, events: TagsDeleteEvents) => {
	return _rootContext.register(TagsDelete, props, events);
};
