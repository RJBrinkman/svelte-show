<script lang="ts">
	import Modal from './Modal.svelte';
	import HighlightContainer from './HighlightContainer.svelte';
	import type { Step } from './types';

	/**
	 * Props for modal
	 */
	export let id = '';
	export let shown = false;
	export let steps: Array<Step>;
	export let currentStepCounter = 0;
	export let useLocalStorage = true;
	$: currentStep = handleStep(steps[currentStepCounter]);
	let callbackTimeout: number | undefined = undefined;

	function handleClose() {
		shown = false;
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
		if (currentStepCounter >= steps.length || localStorage.getItem(id) !== undefined) finish();

		// If there is a position callback it needs to be called before anything else
		if (step.positionCallback) {
			step.positionCallback.apply(null, step.positionCallbackArguments || []);
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
		if (step.callback) {
			callbackTimeout = setTimeout(() => {
				step.callback.apply(null, step.callbackArguments || []);
			}, 200);
		}

		return step;
	}

	function finish() {
		if (useLocalStorage) {
			localStorage.setItem(id, "true");
		}
		shown = false;
	}
</script>

{#if steps.length > 0 && shown}
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
