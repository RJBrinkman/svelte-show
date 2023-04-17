<script lang="ts">
	import { calculatePosition } from './helpers';

	export let id: string;
	export let hide = false;
	export let target: Element | string | null = null;

	let scrollY: number = 0;
	let scrollX: number = 0;
	$: positionVariables = calculatePosition(target, {
		id,
		type: 'HighlightContainer',
		scrollY,
		scrollX
	});
</script>

<svelte:window bind:scrollY bind:scrollX />

<div class="highlight-container" class:hide style={positionVariables} />

<style lang="scss">
	.highlight-container {
		border: 0.1em solid black;
		border-radius: 0.25em;
		box-shadow: 0 0 0 9999999px rgba(0, 0, 0, 0.3);
		z-index: 9000;
		position: absolute;
		transition: 250ms ease-in-out;
		padding: 0.25rem;
		transform: translate(-0.25rem, -0.25rem);
		pointer-events: none;

		top: var(--top, 0);
		left: var(--left, 0);
		width: var(--width, 0);
		height: var(--height, 0);

		&.hide {
			border: none;
			padding: 0;
		}
	}
</style>
