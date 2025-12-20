class InternalState {
	itemsDisablingScroll = $state<string[]>([]);

	ScrollingDisabled = $derived(this.itemsDisablingScroll.length > 0);

	resetScrollQueue() {
		this.itemsDisablingScroll = [];
	}
}

export const internalState = new InternalState();
