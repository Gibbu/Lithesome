import { SvelteMap } from 'svelte/reactivity';
import { portal } from '$lib/attachments/portal.js';
import { trap } from '$lib/attachments/trap.js';
import { addEvents, attach, buildContext, createAttributes, KEYS, Scrolling } from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type {
	ModalBackdropProps,
	ModalContentProps,
	ModalDescriptionProps,
	ModalProps,
	ModalTitleProps,
	ModalTriggerProps
} from '$lib/types/index.js';

const { attrs } = createAttributes('modal', ['root', 'trigger', 'backdrop', 'content', 'title', 'description']);

//
// ~ROOT
//
type RootProps = GetInternalProps<ModalProps>;
class ModalRoot extends Scrolling {
	$$: RootProps;

	sharedIds = new SvelteMap<'content' | 'title' | 'description', string>();

	constructor(props: RootProps) {
		super(props.id.val);

		this.$$ = props;

		$effect(() => {
			window.addEventListener('keydown', this.handleKeydown);
			return () => {
				window.removeEventListener('keydown', this.handleKeydown);
			};
		});

		$effect(() => {
			if (this.$$.visible.val) {
				this.addItemToScrollQueue();
			} else {
				this.removeItemFromScrollQueue();
			}
		});
	}

	open = () => {
		this.$$.visible.val = true;
	};
	close = () => {
		this.$$.visible.val = false;
	};
	toggle = () => {
		this.$$.visible.val = !this.$$.visible.val;
	};

	handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape) this.$$.visible.val = false;
	};

	state = $derived.by(() => ({
		visible: this.$$.visible.val
	}));
}

//
// ~TRIGGER
//
type TriggerProps = GetInternalProps<ModalTriggerProps>;
class ModalTrigger {
	$$: TriggerProps;

	_root: ModalRoot;

	constructor(root: ModalRoot, props: TriggerProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.trigger]: '',
		'aria-haspopup': 'dialog',
		'aria-expanded': this._root.$$.visible.val,
		'aria-controls': this._root.$$.visible.val ? this._root.sharedIds.get('content') : undefined,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this._root.$$.disabled.val) return;

					this._root.toggle();
				}
			})
		)
	}));

	state = $derived.by(() => ({
		visible: this._root.$$.visible.val
	}));
}

//
// ~BACKDROP
//
type BackdropProps = GetInternalProps<ModalBackdropProps>;
class ModalBackdrop {
	$$: BackdropProps;

	_root: ModalRoot;

	constructor(root: ModalRoot, props: BackdropProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.backdrop]: '',
		'aria-hidden': true,
		...attach((node) => {
			const eventsCleanUp = addEvents(node, {
				click: () => {
					if (this._root.$$.disabled.val || !this._root.$$.closeOnBackdropClick.val) return;

					this._root.close();
				}
			});
			const portalCleanUp = portal(this._root.$$.portalTarget.val)(node);

			return () => {
				eventsCleanUp?.();
				portalCleanUp?.();
			};
		})
	}));

	state = $derived.by(() => ({
		visible: this._root.$$.visible.val
	}));
}

//
// ~CONTENT
//
type ContentProps = GetInternalProps<ModalContentProps>;
class ModalContent {
	$$: ContentProps;

	_root: ModalRoot;

	constructor(root: ModalRoot, props: ContentProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(
		() =>
			({
				id: this.$$.id.val,
				[attrs.content]: '',
				role: 'dialog',
				'aria-modal': 'true',
				tabindex: -1,
				'aria-describedby': this._root.sharedIds.get('description'),
				'aria-labelledby': this._root.sharedIds.get('title'),
				...attach((node) => {
					const trapCleanUp = trap({
						allowOutsideClick: true
					})(node);
					const portalCleanUp = portal(this._root.$$.portalTarget.val)(node);

					return () => {
						trapCleanUp?.();
						portalCleanUp?.();
					};
				})
			}) as const
	);

	state = $derived.by(() => ({
		visible: this._root.$$.visible.val
	}));
}

//
// ~TITLE
//
type TitleProps = GetInternalProps<ModalTitleProps>;
class ModalTitle {
	$$: TitleProps;

	_root: ModalRoot;

	constructor(root: ModalRoot, props: TitleProps) {
		this._root = root;

		this.$$ = props;

		this._root.sharedIds.set('title', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.title]: ''
	}));
}

//
// ~DESCRIPTION
//
type DescriptionProps = GetInternalProps<ModalDescriptionProps>;
class ModalDescription {
	$$: DescriptionProps;

	_root: ModalRoot;

	constructor(root: ModalRoot, props: DescriptionProps) {
		this._root = root;

		this.$$ = props;

		this._root.sharedIds.set('description', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.description]: ''
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(ModalRoot);

export const createModalRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useModalTrigger = (props: TriggerProps) => {
	return rootCtx.register(ModalTrigger, props);
};

export const useModalBackdrop = (props: BackdropProps) => {
	return rootCtx.register(ModalBackdrop, props);
};

export const useModalContent = (props: ContentProps) => {
	return rootCtx.register(ModalContent, props);
};

export const useModalTitle = (props: TitleProps) => {
	return rootCtx.register(ModalTitle, props);
};

export const useModalDescription = (props: DescriptionProps) => {
	return rootCtx.register(ModalDescription, props);
};
