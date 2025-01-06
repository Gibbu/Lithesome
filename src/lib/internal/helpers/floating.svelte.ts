import {
	computePosition,
	flip,
	shift,
	autoUpdate,
	size,
	arrow as floatingArrow,
	offset as floatingOffset,
	type Placement
} from '@floating-ui/dom';
import { defaultConfig, setNodeStyles, setNodeProps, type StateValue } from '$internal';

interface FloatingConfig {
	anchor: StateValue<HTMLElement | null>;
	arrow?: StateValue<HTMLElement | null>;
	placement?: Placement;
	constrainViewport?: boolean;
	sameWidth?: boolean;
	offset?: number;
}

export const useFloating = (node: HTMLElement, config: FloatingConfig) => {
	const { anchor, arrow, placement, constrainViewport, sameWidth, offset } = defaultConfig(config, {
		anchor: { val: null },
		arrow: { val: null },
		placement: 'bottom',
		constrainViewport: false,
		sameWidth: false,
		offset: 0
	});

	if (!anchor.val) return;

	let cleanUp: VoidFunction | null | undefined = null;

	cleanUp = autoUpdate(anchor.val, node, () => {
		if (!anchor.val) return;
		computePosition(anchor.val, node, {
			placement,
			middleware: [
				floatingOffset(offset),
				arrow.val ? floatingArrow({ element: arrow.val }) : undefined,
				flip(),
				shift({
					padding: 10
				}),
				size({
					apply({ availableHeight, availableWidth, elements }) {
						if (sameWidth) elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';
						if (constrainViewport) {
							setNodeStyles(node, {
								maxWidth: `${availableWidth}px`,
								maxHeight: `${availableHeight}px`
							});
						}
					}
				})
			]
		}).then(({ x, y, placement, middlewareData }) => {
			const [side, alignment] = placement.split('-');

			setNodeStyles(node, {
				left: `${x}px`,
				top: `${y}px`,
				position: 'absolute'
			});
			setNodeProps(node, {
				'data-side': side,
				'data-alignment': alignment || 'center'
			});

			if (arrow.val) {
				const arrowPos = middlewareData.arrow;
				const side = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[placement.split('-')[0]];
				if (!arrowPos || !side) return;

				const arrowSize = (arrow.val.getBoundingClientRect().width / 3).toFixed();

				setNodeStyles(arrow.val, {
					left: arrowPos.x != null ? `${arrowPos.x}px` : '',
					top: arrowPos.y != null ? `${arrowPos.y}px` : '',
					right: '',
					bottom: '',
					[side]: `-${arrowSize}px`,
					position: 'absolute'
				});
				setNodeProps(arrow.val, {
					'data-side': side
				});
			}
		});
	});

	return {
		destroy() {
			cleanUp?.();
		}
	};
};
