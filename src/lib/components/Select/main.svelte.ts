import { createUID, Floating, removeDisabledElements, type JsonValue } from '$internal';
//
// Root
//
interface SelectRootProps {
	multiple: boolean;
}
class SelectRoot extends Floating {
	uid = createUID('select').uid;
	visible = $state<boolean>(true);
	hoveredIndex = $state<number>(-1);
	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);
	multiple = $state<boolean>(false);

	HoveredOption = $derived<HTMLElement | undefined>(this.options[this.hoveredIndex] || undefined);

	constructor(props: SelectRootProps) {
		super();
		this.multiple = props.multiple;
	}

	open = () => {
		this.visible = true;
	};
	close = () => {
		this.visible = false;
	};
	toggle = () => {
		this.visible = !this.visible;
	};
	queryElements = () => {
		return removeDisabledElements(`#${this.uid('content')} [data-selectoption]`);
	};
}
