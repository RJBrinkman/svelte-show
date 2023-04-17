<script lang="ts">
	import Modal from './Modal.svelte';
	import HighlightContainer from './HighlightContainer.svelte';
	import type { Step } from './types';

	/**
	 * Props for modal
	 */
	export let id = '';
	export let active = false;
	export let steps: Array<Step>;
	export let currentStepCounter = 0;
	export let useLocalStorage = true;
	$: currentStep = handleStep(steps[currentStepCounter]);
	let callbackTimeout: number | undefined = undefined;

	function handleClose() {
		active = false;
	}

	function handleBack() {
		if (currentStepCounter == 0) return;
		currentStepCounter--;
	}

	function handleNext() {
		currentStepCounter++;
	}

	function handleStep(step: Step | undefined) {
		// Return a step is the step is undefined for some reason
		if (!step) return {} as Step;
		// Finish if the last step has finished
		console.log(localStorage.getItem(id));
		if (currentStepCounter >= steps.length || localStorage.getItem(id) !== null) finish();

		// If there is a position callback it needs to be called before anything else
		if (step.beforeCallback) {
			step.beforeCallback.apply(null, step.beforeCallbackArguments || []);
		}

		// Update button text for the last step is the user has inputted none
		if (currentStepCounter == steps.length - 1) {
			if (!step.nextButtonText) {
				step.nextButtonText = 'Finish';
			}
		}

		// Clear the previous callback timeout if it has not fired yet
		clearTimeout(callbackTimeout);

		// If there is a callback for this step call it a slight delay to give the dom time to update
		if (step.afterCallback) {
			callbackTimeout = setTimeout(() => {
				step.afterCallback.apply(null, step.afterCallbackArguments || []);
			}, 200);
		}

		return step;
	}

	function finish() {
		if (useLocalStorage) {
			localStorage.setItem(id, "true");
		}
		active = false;
	}
</script>

{#if steps.length > 0 && active}
	<Modal
		{id}
		target={currentStep['target']}
		title={currentStep['title']}
		nextButtonText={currentStep['nextButtonText']}
		backButtonText={currentStep['backButtonText']}
		disableBackButton={currentStepCounter <= 0}
		on:close={handleClose}
		on:back={handleBack}
		on:next={handleNext}
	>
		{#if currentStep['body']}
			{@html currentStep['body']}
		{:else}
			<slot />
		{/if}
	</Modal>
	<HighlightContainer {id} target={currentStep['target']} />
{/if}
