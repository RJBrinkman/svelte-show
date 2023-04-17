export interface Step {
	title: string;
	body?: HTMLElement | string;
	target: HTMLElement | null | string;
	/* Custom text for back and next button */
	backButtonText?: string;
	nextButtonText?: string;
	/* Setup a callback function which is called once everything has fully loaded  */
	callback?: any;
	callbackArguments?: Array<any>;
	/* Setup a callback to reposition the page before setting this step if need be */
	positionCallback?: any;
	positionCallbackArguments?: Array<any>;
}

export interface CalculatePositionOptions {
	type: 'Modal' | 'HighlightContainer';
	id: string;
	placement?: Placement;
	scrollX?: number;
	scrollY?: number;
}

export type Placement = 'top' | 'left' | 'bottom' | 'right';
