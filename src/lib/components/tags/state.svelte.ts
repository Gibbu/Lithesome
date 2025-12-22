import { addEvents, attach, buildContext, createAttributes, KEYS, PREVENT_KEYS } from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/index.js';
import type { TagsDeleteProps, TagsInputProps, TagsItemProps, TagsProps } from '$lib/types/components/tags.js';

const { attrs } = createAttributes('tags', ['root', 'input', 'item', 'delete']);

//
// ~ROOT
//
type RootProps = GetInternalProps<TagsProps>;
class TagsRoot {
	$id: string;
	$value: RootProps['value'];
	$disabled: RootProps['disabled'];
	$max: RootProps['max'];
	$whitelist: RootProps['whitelist'];
	$blacklist: RootProps['blacklist'];

	invalid = $state<boolean>(false);
	index = $state<number>(-1);
	input = $state<HTMLInputElement | null>(null);

	SelectedTag = $derived.by(() => (this.index !== -1 ? this.$value.val[this.index] : null));

	constructor(props: RootProps) {
		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$max = props.max;
		this.$whitelist = props.whitelist;
		this.$blacklist = props.blacklist;
		this.$id = props.id;
	}

	allowedTag = (tag: string) => {
		if (tag.trim().length === 0) return false;
		else if (this.$max.val !== 0 && this.$value.val.length >= this.$max.val) return false;
		else if (this.$value.val.includes(tag)) return false;
		else if (this.$blacklist.val.length && this.$blacklist.val.includes(tag)) return false;
		else if (this.$whitelist.val.length && !this.$whitelist.val.includes(tag)) return false;
		else return true;
	};

	addTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (!this.allowedTag(tag)) {
			this.invalid = true;
			return false;
		}

		this.$value.val = [...this.$value.val, tag.trim()];

		return true;
	};

	deleteTag = (tag: string) => {
		if (this.$disabled.val) return;

		if (this.$value.val.includes(tag)) {
			this.$value.val = this.$value.val.filter((el) => el !== tag);
		}
	};

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.root]: '',
		...attach((node) =>
			addEvents(node, {
				click: (e) => {
					if (e.target === e.currentTarget) {
						this.input?.focus();
					}
				}
			})
		)
	}));

	state = $derived.by(() => ({
		activeTag: this.SelectedTag,
		invalid: this.invalid
	}));
}

//
// ~INPUT
//
type InputProps = GetInternalProps<TagsInputProps>;
class TagsInput {
	$id: string;

	_root: TagsRoot;

	constructor(root: TagsRoot, props: InputProps) {
		this._root = root;
		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.input]: '',
		type: 'text',
		...attach<HTMLInputElement>((node) => {
			this._root.input = node;

			return addEvents(node, {
				keydown: (e) => {
					if (this._root.$disabled.val) return;
					const target = e.currentTarget as HTMLInputElement;
					const cursor = target.selectionStart || 0;

					const { key } = e;

					if (!PREVENT_KEYS.includes(key)) this._root.invalid = false;
					if (key === KEYS.enter && this._root.addTag(target.value)) target.value = '';

					if (!PREVENT_KEYS.includes(key) && this._root.index !== -1) this._root.index = -1;

					if ((key === KEYS.arrowLeft && cursor === 0) || (key === KEYS.arrowRight && this._root.SelectedTag))
						e.preventDefault();

					if (cursor === 0) {
						if (key === KEYS.arrowLeft) {
							if (this._root.index === -1) this._root.index = this._root.$value.val.length - 1;
							else if (this._root.index !== 0) this._root.index -= 1;
						}
						if (key === KEYS.arrowRight && this._root.index !== -1 && this._root.SelectedTag) {
							this._root.index += 1;
						}

						if (key === KEYS.backspace) {
							if (this._root.index === -1) this._root.index = this._root.$value.val.length - 1;
							else if (this._root.index !== -1 && this._root.SelectedTag) {
								this._root.deleteTag(this._root.SelectedTag);
								if (this._root.index !== 0) this._root.index -= 1;
							}
						}

						if (key === KEYS.delete && this._root.SelectedTag) this._root.deleteTag(this._root.SelectedTag);
					}
				},
				input: (e) => {
					if (this._root.$disabled.val) return;

					const target = e.target as HTMLInputElement;

					if (target.value.trim().length === 0) this._root.invalid = false;
				},
				blur: () => {
					if (this._root.$disabled.val) return;

					this._root.index = -1;
					this._root.invalid = false;
				}
			});
		})
	}));

	state = $derived.by(() => ({
		invalid: this._root.invalid
	}));
}

//
// ~ITEM
//
type ItemProps = GetInternalProps<TagsItemProps>;
class TagsItem {
	$id: string;
	$value: ItemProps['value'];

	_root: TagsRoot;

	Active = $derived.by(() => this._root.SelectedTag === this.$value.val);

	constructor(root: TagsRoot, props: ItemProps) {
		this._root = root;
		this.$value = props.value;
		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.item]: ''
	}));

	state = $derived.by(() => ({
		active: this.Active
	}));
}

//
// ~DELETE
//
type DeleteProps = GetInternalProps<TagsDeleteProps>;
class TagsDelete {
	$id: string;
	$value: DeleteProps['value'];

	_root: TagsRoot;

	constructor(root: TagsRoot, props: DeleteProps) {
		this._root = root;
		this.$value = props.value;
		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.delete]: '',
		type: 'button',
		tabIndex: -1,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this._root.$disabled.val) return;

					this._root.deleteTag(this.$value.val);
				}
			})
		)
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(TagsRoot);

export const createTagsRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};
export const useTagsInput = (props: InputProps) => {
	return rootCtx.register(TagsInput, props);
};
export const useTagsItem = (props: ItemProps) => {
	return rootCtx.register(TagsItem, props);
};
export const useTagsDelete = (props: DeleteProps) => {
	return rootCtx.register(TagsDelete, props);
};
