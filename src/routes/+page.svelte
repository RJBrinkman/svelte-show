<script lang="ts">
	import Show from '$lib/Show.svelte';
	import type { Step } from '$lib/types';
	import { onMount } from 'svelte';

	let steps: Array<Step> = [];
	let shown = false;

	onMount(() => {
		steps = [
			{
				title: 'Here you define a title for the modal',
				body: 'Here you define a body for the modal',
				target: document.getElementById('title')
			},
			{
				title: 'First paragraph',
				body: 'Here you define a body for the modal',
				target: document.getElementById('first')
			},
			{
				title: 'Second paragraph',
				body: 'Here you define a body for the modal',
				target: '#second'
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

<Show id={'test-show'} {steps} {shown} />

<style lang="scss">
	#title {
		color: red;
	}
</style>
