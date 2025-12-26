import type { Props } from '$lib/internals/index.js';

export type DropzoneErrorType = 'maxSize' | 'invalidType' | 'multiple' | 'custom' | 'success';

export interface DropzoneEventMaxSize {
	type: 'maxSize';
	file: File;
	limit: number;
}
export interface DropzoneEventInvalidType {
	type: 'invalidType';
	file: File;
	accept: string;
	recieved: string;
}
export interface DropzoneEventCustom {
	type: 'custom';
	file: File;
}

export type DropzoneErrorEvents = DropzoneEventMaxSize | DropzoneEventInvalidType | DropzoneEventCustom;

//
// ~ROOT
//
export interface DropzoneProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The current accepted files of the dropzone.
	 *
	 * ### `$bindable`
	 */
	files?: File[];
	/**
	 * Allow for more than 1 file to be present at once.
	 */
	multiple?: boolean;
	/**
	 * The maximum size of the file to be added.
	 *
	 * If the provided file is above this number, the `onError` callback will be fired.
	 */
	maxSize?: number;
	/**
	 * The types of files allowed to be added.
	 *
	 * If the provided file does not match these requirements, the `onError` callback will be fired.
	 */
	accept?: string;
	/**
	 * Disables the entire component from firing events.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * Custom validation per file picked.
	 *
	 * For the file to pass this validation, the return statement must be truthy.
	 *
	 * @example
	 * ```js
	 * validate(file) {
	 * 	return file.name === 'coolFile.txt';
	 * }
	 * ```
	 * Only the file name "coolFile.txt" will be allowed through.
	 * @param file The file that was just added.
	 * @param files The current accepted files.
	 */
	validate?: (file: File, files: File[]) => boolean;
	/**
	 * If any errors are found through `allowed`, `maxSize` props, or the custom `validation` callback,\
	 * this callback will be fired with the related type of error, file, and depending on the error, some extra information.
	 * @param data The error object
	 */
	onError?: (data: DropzoneErrorEvents) => void;
	/**
	 * If no errors were found during validation, this callback will be fired.
	 * @param file The file that successfully passed all validation.
	 */
	onSuccess?: (file: File) => void;
	/**
	 * When files are successfully added or removed to the `files` prop, this event will be fired.
	 * @param files The new value of `files`.
	 */
	onChange?: (files: File[]) => void;
}

//
// ~INPUT
//
export interface DropzoneInputProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}
