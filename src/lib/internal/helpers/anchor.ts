import {
	computePosition,
	flip,
	shift,
	autoUpdate,
	size,
	arrow as floatingArrow,
	type Placement
} from '@floating-ui/dom';
import { defaultConfig, setNodeStyles, setNodeProps } from '$lib/internal/index.js';

type AnchorElement = HTMLElement | undefined | null;
interface AnchorElements {
	anchor: AnchorElement;
	target: AnchorElement;
	arrow?: AnchorElement;
}
interface AnchorConfig {
	placement?: Placement;
	constrainViewport?: boolean;
	sameWidth?: boolean;
}

export const anchorElement = (elements: AnchorElements, config?: AnchorConfig) => {
	if (!elements.anchor || !elements.target) return;

	const { placement, constrainViewport, sameWidth } = defaultConfig(config, {
		placement: 'bottom',
		constrainViewport: false,
		sameWidth: false
	});
	const { anchor, target, arrow } = elements;

	const cleanup = autoUpdate(anchor, target, () => {
		computePosition(anchor, target, {
			placement,
			middleware: [
				arrow ? floatingArrow({ element: arrow }) : undefined,
				flip(),
				shift({
					padding: 10
				}),
				size({
					apply({ availableHeight, availableWidth, elements }) {
						if (sameWidth) elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';
						if (constrainViewport) {
							setNodeStyles(target, {
								maxWidth: `${availableWidth}px`,
								maxHeight: `${availableHeight}px`
							});
						}
					}
				})
			]
		}).then(({ x, y, placement, middlewareData }) => {
			const [side, alignment] = placement.split('-');

			setNodeStyles(target, {
				left: `${x}px`,
				top: `${y}px`,
				position: 'absolute'
			});
			setNodeProps(target, {
				'data-side': side,
				'data-alignment': alignment || 'center'
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

	return cleanup;
};
