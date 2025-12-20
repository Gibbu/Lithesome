import { createAttachmentKey } from 'svelte/attachments';

import type { Attachment } from 'svelte/attachments';

export const attach = <T extends HTMLElement>(fn: Attachment<T>) => {
	return {
		[createAttachmentKey()]: fn
	};
};
