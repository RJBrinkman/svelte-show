# <div style="text-align: center;">Svelte Show</div>
Svelte Show is a library aimed to help you setup an easy show-case of any project you have created. It allows for programatically creating a showcase of your project by defining steps over which the Show element iterates. These steps have quite some options with a lot more ideas on the way.

## Usage
Import the `Show.svelte`, add it to a page / component which you want to showcase. Give it an array of steps and tell it to start. There are multiple options for the `Show.svelte` component:
 - id: a string which is used as unique identifier for localStorage and the modal used for context
 - active: a boolean which tells the Show component wether it should display anything
 - steps: an array of steps which should be rendered
 - currentStepCounter: a number that can be used to find out at which step we currently are
 - useLocalStorage: a boolean to tell the `Show.svelte` component to use the localStorage for checking wether it has already ran once, set this to true if you want a Showcase to only run once for a user

The steps array consists of Step objects, these should adhere to the following structure:
```typescript 
interface Step {
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
```

- The title needs to be string and will be used as title for the modal.
- The body can be empty and instead slotted content can be used. This could be made conditional on the step. The body can also contain some form of HTML elements such that you can render almost anything there.
- The target can either be an HTMLElement or a string with which an element can be selected by a `document.querySelector()` call. This allows for currently unrendered components to be part of the Showcase. If no target can be found or the target is null, the highlightbox will not show and the modal will be centered.
- The backButtonText can be used for a custom back button text this step
- The nextButtonText can be used for a custom next button text this step
- beforeCallback & Arguments can be used to do anything before this step, maybe some interaction with a D3js element needs to be made just in case the user has done anything already and you´d like to reset everything
- afterCallback & Arguments will be called after everything is done to do some cleanup if needed

## Roadmap for the project

Currently everything works as is but there are quite some ideas to improve this Showcase library for it to be usable by more people!
- Have multiple targets within a step, e.g. the ability to have "inner" steps
- Create position arguments for screen corners for modal placement
- Have the ability to create highlights within highlights (this would go very nicely with the 1st idea and much more complex showcases and user interactions could be showcased)
- Better customizable styling, I´d like to keep this as barebones as possible in regards to style but everything should easy to customize and overwrite with own custom styling
- Fully E2E testing using playwright
- Vitest testing for seperate components
