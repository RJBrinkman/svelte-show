export interface Step {
	title: string;
	/* If body is not present the slotted content will be used (which can be empty) */
	body?: HTMLElement | string;
	target: HTMLElement | null | string;
	/* Custom text for back and next button */
	backButtonText?: string;
	nextButtonText?: string;
	/* beforeCallback is called before anything, e.g. to reposition certain things */
	beforeCallback?: any;
	beforeCallbackArguments?: Array<any>;
	/* afterCallback is called after everything has finished  */
	afterCallback?: any;
	afterCallbackArguments?: Array<any>;
}

export interface CalculatePositionOptions {
	type: 'Modal' | 'HighlightContainer';
	id: string;
	placement?: Placement;
	scrollX?: number;
	scrollY?: number;
}

export type Placement = 'top' | 'left' | 'bottom' | 'right';
