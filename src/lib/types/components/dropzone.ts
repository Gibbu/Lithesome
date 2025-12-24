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
export interface DropzoneEventMultiple {
	type: 'multiple';
	file: File;
	multiple: boolean;
}
export interface DropzoneEventCustom {
	type: 'custom';
	file: File;
}
export interface DropzoneEventSuccess {
	type: 'success';
	file: File;
}

export type DropzoneErrorEvents =
	| DropzoneEventMaxSize
	| DropzoneEventInvalidType
	| DropzoneEventMaxSize
	| DropzoneEventCustom;

//
// ~ROOT
//
export interface DropzoneProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	files?: File[];
	multiple?: boolean;
	maxSize?: number;
	accept?: string;
	disabled?: boolean;
	validate?: (file: File, files: File[]) => boolean;
	onError?: (data: DropzoneErrorEvents) => void;
	onSuccess?: (data: DropzoneEventSuccess) => void;
	onChange?: (files: File[]) => void;
}

//
// ~INPUT
//
export interface DropzoneInputProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}
