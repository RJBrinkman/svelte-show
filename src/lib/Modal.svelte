<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { calculatePosition } from './helpers';
	import type { Placement } from './types';
	import { onMount } from 'svelte';

	/**
	 * Props for the modal
	 */
	export let id: string;
	export let target: Element | string | null = null;
	export let title = '';
	export let backButtonText: string | undefined = 'Back';
	export let nextButtonText: string | undefined = 'Next';
	export let placement: Placement = 'bottom';
	export let show = true;
	export let disableBackButton = false;

	// The position and center should be updated anytime the target, id or placement are changed
	$: positionVariables = calculatePosition(target, {
		id,
		type: 'Modal',
		placement
	});
	$: center = !target;

	// Dispatcher for close, back and next events
	const dispatcher = createEventDispatcher();

	// Once everything has mounted the target is re-assigned to trigger the recalculation of the position variables
	onMount(() => {
		target = target;
	});
</script>

<div {id} class="modal" class:show class:center style={positionVariables}>
	<button class="close-btn" on:click={() => dispatcher('close')}>&times;</button>
	<header class="title">{title}</header>
	<div class="body">
		<slot />
	</div>
	<div class="controls">
		<button disabled={disableBackButton} on:click={() => dispatcher('back')}>
			{backButtonText !== undefined ? backButtonText : 'Back'}
		</button>
		<button on:click={() => dispatcher('next')}>
			{nextButtonText !== undefined ? nextButtonText : 'Next'}
		</button>
	</div>
</div>

<style lang="scss">
	.modal {
		top: calc(var(--y, 50%) + var(--yOffset, 0));
		left: calc(var(--x, 50%) + var(--xOffset, 0));
		background-color: white;
		position: absolute;
		border-radius: 0.25em;
		max-width: 500px;
		min-width: 300px;
		z-index: 9001;
		opacity: 0;
		transform: scale(var(--scale)) translate(var(--translate));
		transition: 150ms ease-in-out;

		&.center {
			--translate: -50%, -50%;
			position: fixed;
			--y: 50% !important;
			--x: 50% !important;
		}

		&.show {
			--scale: 1;
			opacity: 1;
		}

		.body,
		.title {
			padding: 1rem;
		}

		.title {
			font-size: 1.25em;
			font-weight: bold;
			padding-bottom: 0;
			max-width: calc(100% - 50px);
		}

		.controls {
			padding: 0.5rem;
			display: flex;
			justify-content: space-between;

			button {
				cursor: pointer;

				&:disabled {
					opacity: 0;
				}
			}
		}

		.close-btn {
			position: absolute;
			top: 0;
			right: 0;
			background: none;
			border: none;
			font-size: 1.25em;
			padding: 1rem 1rem 0 1rem;
			cursor: pointer;
			color: #777;
			transition: 150ms ease-in-out;

			&:hover {
				color: black;
			}
		}
	}
</style>
