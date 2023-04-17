<script lang="ts">
	import Show from '$lib/Show.svelte';
	import type { Step } from '$lib/types';
	import { onMount } from 'svelte';

	let steps: Array<Step> = [];
	let shown = false;

	function message(message: string) {
		console.log(message);
	}

	onMount(() => {
		steps = [
			{
				title: 'Here you define a title for the modal',
				body: 'Here you define a body for the modal',
				target: document.getElementById('title'),
				positionCallback: message,
				positionCallbackArguments: ["Position title"],
				callback: message,
				callbackArguments: ["Callback title"]
			},
			{
				title: 'First paragraph',
				body: 'Here you define a body for the modal',
				target: document.getElementById('first'),
				backButtonText: "Back to title",
				nextButtonText: "Next to second p element"
			},
			{
				title: 'Second paragraph',
				body: 'Here you define a body for the modal',
				target: '#second'
			},
			{
				title: 'Third paragraph',
				body: 'Smooth scroll?',
				target: '#third'
			}
		];

		shown = true;
	});
</script>

<h1 id="title">Welcome to your library project</h1>
<p id="first">
	Create your package using @sveltejs/package and preview/showcase your work with SvelteKit
</p>
<p id="second">
	Visit <a class="link" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<div class="bottom">
<p id="third">
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis tempore provident fugit quis adipisci facere expedita vel iste, quo beatae repellat soluta asperiores sit accusantium aspernatur eligendi maiores consequuntur. Voluptatibus.
</p>
</div>

<Show id={'test-show'} {steps} {shown} />

<style lang="scss">
	#title {
		color: red;
	}

	.bottom {
		margin-top: 1500px;
		margin-bottom: 500px;
	}
</style>
