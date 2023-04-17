export interface Step {
	title: string;
	body: HTMLElement | null | string;
	target: HTMLElement | null | string;
	backButtonText?: string;
	nextButtonText?: string;
}

export interface CalculatePositionOptions {
	type: 'Modal' | 'HighlightContainer';
	id: string;
	oversizeX?: number;
	oversizeY?: number;
	placement?: Placement;
	scrollX?: number;
	scrollY?: number;
}

export type Placement = 'top' | 'left' | 'bottom' | 'right';

// {
//     title: 'Here you define a title for the modal',
//     body: 'Here you define a body for the modal',
//     element: 'Here you pass and HTMLElement or query selector string on which you want to focus',
//     callback: 'Here you pass a reference to a callback function',
//     callbackArguments:
//         'Here you pass the needed arguments for said callback function, this needs to be an array!',
//     positionCallback:
//         'Here you pass a reference to a function that can reposition the screen for the user, such that if they somehow interacted with the website they can be put back',
//     positionCallbackArguments:
//         'If the callback function needs any arguments you can pass them here, this needs to be an array!',
//     nextButtonText: 'Here you put the text you want displayed on the next button',
//     backButtonText: 'Here you put the text you want displayed on the back button',
//     overSizeX:
//         'Here you put the amount of pixels you want the highlight box to oversize in horizontal direction',
//     overSizeY:
//         'Here you put the amount of pixels you want the highlight box to oversize in vertical direction'
// }
