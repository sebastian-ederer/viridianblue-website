<script lang="ts">
	import AudioProgressControl from '$lib/components/audioProgressControl.svelte';
	import AudioWave from '$lib/components/audioWave.svelte';
	import Birds from '$lib/components/birds.svelte';
	import Particles from '$lib/components/particles.svelte';
	import PlayPauseButton from '$lib/components/playPauseButton.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
	import VolumeControl from '$lib/components/volumeControl.svelte';
	import '@fontsource-variable/dancing-script';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement | undefined = $state();
	let audioContext: AudioContext | undefined = $state();

	let volume = $state(0.2);
	let muted = $state(false);

	onMount(() => {
		if (!audioContext && audio) {
			audioContext = new AudioContext();
		}
	});
</script>

<div class="home">
	<div class={'audioWrapper'} style="z-index: 10">
		<audio bind:this={audio} loop {volume} {muted}>
			<source src={'/porter-robinson-sea-of-voices.mp3'} type="audio/mpeg" />
			<source src={'/porter-robinson-sea-of-voices.ogg'} type="audio/ogg" />
		</audio>
	</div>

	<div class="heading-wrapper">
		<h1 class="heading">Viridian Blue</h1>
		{#if audioContext}
			<PlayPauseButton {audio} {audioContext} />

			<div class={'progress-wrapper'}>
				<AudioProgressControl {audio} {audioContext} />
			</div>
		{/if}
	</div>

	<div class="background">
		<Birds />
		<SunRays />
		<Particles />
	</div>

	<div class={'volume-wrapper'}>
		<VolumeControl bind:volume bind:muted />
	</div>
	{#if audioContext}
		<AudioWave {audio} {audioContext} height={80} />
	{/if}
</div>

<style lang="scss">
	.home {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.heading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		width: 100%;
		gap: 24px;
	}

	.heading {
		font-size: 5rem;
		font-family: 'Dancing Script Variable', cursive;
		font-weight: bold;
		color: rgb(0, 41, 88);
		text-align: center;
		user-select: none;
		z-index: 1;
		margin: 0;

		@media (max-width: 768px) {
			font-size: 4rem;
		}

		@media (max-width: 480px) {
			font-size: 3rem;
		}
	}

	.audioWrapper {
		position: absolute;
	}

	.progress-wrapper {
		z-index: 2;
		width: 60%;
	}

	.volume-wrapper {
		position: absolute;
		right: 32px;
		bottom: 90px;
		display: flex;
		justify-content: end;
		align-items: end;

		@media (max-width: 1200px) {
			right: 16px;
		}
	}
</style>
