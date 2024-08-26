import { buildContext, createUID, disableScroll, KEYS, type ContextChange } from '$internal';
//
// Root
//
interface ModalRootProps {
	visible: boolean;
}
class ModalRoot {
	uid = createUID('modal').uid;
	visible = $state<boolean>(false);

	constructor(props: ContextChange<ModalRootProps>) {
		this.visible = props.visible;

		$effect(() => {
			props.onContextChange({ visible: this.visible });
			console.log(this.visible);
		});
		$effect(() => {
			disableScroll(this.visible && !document.body.style.overflow);
		});
		$effect(() => {
			window.addEventListener('keydown', this.#handleKeys);
			return () => {
				window.removeEventListener('keydown', this.#handleKeys);
			};
		});
	}
	onComponentChange(props: ModalRootProps) {
		this.visible = props.visible;
	}

	#handleKeys = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape) this.visible = false;
	};
}

//
// Overlay
//
class ModalOverlay {
	root: ModalRoot;

	Visible = $derived.by(() => this.root.visible);

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('overlay'),
		'aria-hidden': true,
		'data-modaloverlay': ''
	}));
}

//
// Content
//
class ModalContent {
	root: ModalRoot;

	Visible = $derived.by(() => this.root.visible);

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('content'),
				role: 'dialog',
				'aria-modal': 'true',
				tabindex: -1,
				'aria-describedby': this.root.uid('description'),
				'aria-labeledby': this.root.uid('title'),
				'data-modalcontent': ''
			}) as const
	);
}

//
// Title
//
class ModalTitle {
	root: ModalRoot;

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('title'),
				'data-modaltitle': ''
			}) as const
	);
}

//
// Description
//
class ModalDescription {
	root: ModalRoot;

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('description'),
				'data-modaldescription': ''
			}) as const
	);
}
//
// Builder
//
const rootContext = buildContext(ModalRoot);

export const createRootContext = (props: ContextChange<ModalRootProps>) => {
	return rootContext.createContext(props);
};

export const useModalOverlay = () => {
	return rootContext.register(ModalOverlay);
};

export const useModalContent = () => {
	return rootContext.register(ModalContent);
};

export const useModalTitle = () => {
	return rootContext.register(ModalTitle);
};

export const useModalDescription = () => {
	return rootContext.register(ModalDescription);
};
