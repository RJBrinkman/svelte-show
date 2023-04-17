<script lang="ts">
	import Modal from './Modal.svelte';
	import HighlightContainer from './HighlightContainer.svelte';
	import type { Step } from './types';

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

		if (currentStep >= steps.length) finish();

		if (currentStep == steps.length - 1) {
			if (!steps[currentStep].nextButtonText) {
				steps[currentStep].nextButtonText = 'Finish';
			}
		}
	}

	function finish() {
		shown = false;
		localStorage.setItem('id', id);
		return;
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
