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
	export let currentStep = 0;

	function handleClose() {
		shown = false;
	}

	function handleBack() {
		if (currentStep == 0) return;
		currentStep--;
	}

	function handleNext() {
		currentStep++;

		// Finish if the last step has finished
		if (currentStep >= steps.length) finish();

		// Update button text for the last step is the user has inputted none
		if (currentStep == steps.length - 1) {
			if (!steps[currentStep].nextButtonText) {
				steps[currentStep].nextButtonText = 'Finish';
			}
		}
	}

	function finish() {
		shown = false;
	}
</script>

{#if steps.length > 0 && shown}
	<Modal
		{id}
		target={steps[currentStep]['target']}
		title={steps[currentStep]['title']}
		body={steps[currentStep]['body']}
		nextButtonText={steps[currentStep]['nextButtonText']}
		backButtonText={steps[currentStep]['backButtonText']}
		disableBackButton={currentStep == 0}
		on:close={handleClose}
		on:back={handleBack}
		on:next={handleNext}
	/>
	<HighlightContainer {id} target={steps[currentStep]['target']} />
{/if}
