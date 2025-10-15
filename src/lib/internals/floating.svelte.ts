import {
	autoUpdate,
	computePosition,
	flip,
	arrow as floatingArrow,
	offset as floatingOffset,
	shift,
	size
} from '@floating-ui/dom';
import { setNodeProps, setNodeStyles } from './element.js';
import { deepMerge } from './utils.svelte.js';

import type { FloatingConfig } from '$lib/internals/index.js';
import type { Attachment } from 'svelte/attachments';

export const floating = (
	anchor: HTMLElement | null,
	arrow: HTMLElement | null,
	config?: FloatingConfig
): Attachment<HTMLElement> => {
	const opts = deepMerge<FloatingConfig, FloatingConfig>(
		{
			placement: 'bottom',
			sameWidth: false
		},
		config || {}
	);

	return (content) => {
		if (!anchor) return;

		return autoUpdate(anchor, content, () => {
			if (!anchor) return;
			computePosition(anchor, content, {
				placement: opts.placement,
				middleware: [
					floatingOffset(opts.offset),
					arrow ? floatingArrow({ element: arrow }) : null,
					flip(opts.flip),
					shift(opts.shift),
					size({
						apply({ elements }) {
							if (opts.sameWidth)
								elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';
						}
					})
				]
			}).then(({ x, y, placement, middlewareData }) => {
				const [side, alignment] = placement.split('-');

				setNodeStyles(content, {
					left: `${x}px`,
					top: `${y}px`,
					position: 'absolute'
				});
				setNodeProps(content, {
					'data-side': side,
					'data-alignment': alignment ?? 'center'
				});

				if (arrow) {
					const arrowPos = middlewareData.arrow;
					const side = {
						top: 'bottom',
						right: 'left',
						bottom: 'top',
						left: 'right'
					}[placement.split('-')[0]];
					if (!arrowPos || !side) return;

					const arrowSize = (arrow.getBoundingClientRect().width / 3).toFixed();

					setNodeStyles(arrow, {
						left: arrowPos.x != null ? `${arrowPos.x}px` : '',
						top: arrowPos.y != null ? `${arrowPos.y}px` : '',
						right: '',
						bottom: '',
						[side]: `-${arrowSize}px`,
						position: 'absolute'
					});
					setNodeProps(arrow, {
						'data-side': side
					});
				}
			});
		});
	};
};
