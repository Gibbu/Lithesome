import { SvelteMap } from 'svelte/reactivity';
import { attach, buildContext } from '$lib/internals/index.js';
import { addEvents, createAttributes } from '$lib/internals/utils.svelte.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type { DropzoneInputProps, DropzoneProps } from '$lib/types/index.js';

const { attrs } = createAttributes('dropzone', ['root', 'input']);

//
// ~ROOT
//
type RootProps = GetInternalProps<DropzoneProps>;
class DropzoneRoot {
	$$: RootProps;

	errorsFound = $state<boolean>(false);
	dragging = $state<boolean>(false);
	dragCount = $state<number>(0);

	sharedIds = new SvelteMap<'input', string>();

	constructor(props: RootProps) {
		this.$$ = props;
	}

	checkFileType = (file: File) => {
		const fileExtension = file.name.split('.').pop()?.toLowerCase();
		const acceptedTypes = this.$$.accept.val.split(',').map((el) => el.trim());

		// Check if extension and mime type match the accept list.
		return acceptedTypes.some((type) => {
			if (type.startsWith('.') && fileExtension) {
				return type.includes(fileExtension);
			} else if (type.endsWith('/*')) {
				return file.type.startsWith(`${type.split('/')[0]}/`);
			} else {
				return file.type === type;
			}
		});
	};

	handleFiles = (filelist: FileList) => {
		const files = Array.from(filelist);
		const length = this.$$.multiple.val ? files.length : 1;

		this.$$.onChange?.(this.$$.files.val);

		for (let i = 0; i < length; i++) {
			const file = files[i];

			if (this.$$.maxSize.val > 0 && file.size > this.$$.maxSize.val) {
				this.$$.onError?.({
					type: 'maxSize',
					file,
					limit: this.$$.maxSize.val
				});
				this.errorsFound = true;
				continue;
			}

			if (this.$$.accept.val && !this.checkFileType(file)) {
				this.$$.onError?.({
					type: 'invalidType',
					file,
					accept: this.$$.accept.val,
					recieved: file.type
				});
				this.errorsFound = true;
				continue;
			}

			if (this.$$.validate && !this.$$.validate?.(file, this.$$.files.val)) {
				this.$$.onError?.({
					type: 'custom',
					file
				});
				this.errorsFound = true;
				continue;
			}

			if (this.$$.multiple.val) {
				this.$$.files.val.push(file);
			} else {
				this.$$.files.val[0] = file;
			}

			this.$$.onSuccess?.(file);
		}
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.root]: '',
		...attach((node) => {
			return addEvents(node, {
				dragenter: (e) => {
					e.preventDefault();
					if (this.$$.disabled.val) return;
					this.dragging = true;
					this.dragCount++;
				},
				dragleave: (e) => {
					e.preventDefault();
					if (this.$$.disabled.val) return;
					this.dragCount--;
					if (this.dragCount === 0) this.dragging = false;
				},
				dragover: (e) => {
					e.preventDefault();
				},
				drop: (e) => {
					e.preventDefault();
					if (this.$$.disabled.val) return;
					this.errorsFound = false;
					if (e.dataTransfer?.files) {
						this.handleFiles(e.dataTransfer.files);
						this.dragging = false;
						this.dragCount = 0;
					}
				},
				click: () => {
					if (this.$$.disabled.val) return;
					const input = document.querySelector(`#${this.sharedIds.get('input')}`) as HTMLInputElement;
					input?.click();
				}
			});
		})
	}));

	state = $derived.by(() => ({
		/**
		 * True if the dropzone is currently being hovered with a file.
		 */
		dragging: this.dragging,
		/**
		 * True if any validation errors are found.
		 */
		errors: this.errorsFound
	}));
}

//
// ~INPUT
//
type InputProps = GetInternalProps<DropzoneInputProps>;
class DropzoneInput {
	$$: InputProps;

	_root: DropzoneRoot;

	constructor(root: DropzoneRoot, props: InputProps) {
		this._root = root;
		this.$$ = props;

		this._root.sharedIds.set('input', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.input]: '',
		type: 'file',
		multiple: this._root.$$.multiple.val,
		accept: this._root.$$.accept.val,
		...attach((node) =>
			addEvents(node, {
				change: (e) => {
					const files = (e.target as HTMLInputElement).files;
					if (files) {
						this._root.errorsFound = false;
						this._root.handleFiles(files);
					}
				}
			})
		)
	}));

	styles = {
		display: 'none'
	};
}

//
// ~BUILDERS
//
const rootCtx = buildContext(DropzoneRoot);

export const createDropzoneRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useDropzoneInput = (props: InputProps) => {
	return rootCtx.register(DropzoneInput, props);
};
