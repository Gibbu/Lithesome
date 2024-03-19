import { computePosition, flip, shift, autoUpdate, size, type Middleware, type Placement } from '@floating-ui/dom';
import { defaultConfig } from './utils.js';

type AnchorElement = HTMLElement | undefined | null;
interface AnchorConfig {
	placement?: Placement;
	constrainViewport?: boolean;
	sameWidth?: boolean;
}

export const anchorElement = (anchor: AnchorElement, target: AnchorElement, config?: AnchorConfig) => {
	if (!anchor || !target) return;

	const { placement, constrainViewport, sameWidth } = defaultConfig(config, {
		placement: 'bottom',
		constrainViewport: false,
		sameWidth: false
	});

	const cleanup = autoUpdate(anchor, target, () => {
		computePosition(anchor, target, {
			placement,
			middleware: [
				flip(),
				shift({
					padding: 10
				}),
				size({
					apply({ availableHeight, availableWidth, elements }) {
						if (sameWidth) elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';
						if (constrainViewport) {
							Object.assign(target.style, {
								maxWidth: `${availableWidth}px`,
								maxHeight: `${availableHeight}px`
							});
						}
					}
				})
			]
		}).then(({ x, y, placement }) => {
			const [side, alignment] = placement.split('-');

			Object.assign(target.style, {
				left: `${x}px`,
				top: `${y}px`,
				position: 'absolute'
			});
			target.setAttribute('data-side', side);
			target.setAttribute('data-alignment', alignment || 'center');
		});
	});

	return cleanup;
};
