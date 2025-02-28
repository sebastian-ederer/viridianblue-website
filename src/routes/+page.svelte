<script lang="ts">
	import AudioProgressControl from '$lib/components/audioProgressControl.svelte';
	import AudioWave from '$lib/components/audioWave.svelte';
	import Background from '$lib/components/background.svelte';
	import PlayPauseButton from '$lib/components/playPauseButton.svelte';
	import VolumeControl from '$lib/components/volumeControl.svelte';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement | undefined = $state();
	let audioContext: AudioContext | undefined = $state();
	let volume = $state(0.2);
	let muted = $state(false);
	let audioWaveHeight: number = $state(80);
	let isSafari = $state(false); // Safari does not support volume controls

	function onWindowResize() {
		audioWaveHeight = window.innerWidth > 1200 ? 120 : 80;
		if (window.innerWidth <= 480 || isSafari) {
			volume = 1;
		}
	}

	onMount(() => {
		const userAgent = window.navigator.userAgent.toLocaleLowerCase();
		isSafari = /^((?!chrome|android).)*safari/.test(userAgent);

		if (!audioContext && audio) {
			audioContext = new AudioContext();
		}

		onWindowResize();
		window.addEventListener('resize', onWindowResize);

		return () => {
			window.removeEventListener('resize', onWindowResize);
		};
	});
</script>

<div class="home">
	<Background />

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
				<AudioProgressControl {audio} />
			</div>
		{/if}
	</div>

	{#if !isSafari}
		<div class={'volume-wrapper'}>
			<VolumeControl bind:volume bind:muted />
		</div>
	{/if}

	{#if audioContext}
		<AudioWave {audio} {audioContext} height={audioWaveHeight} />
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
		color: rgb(var(--color-primary));
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
		bottom: 130px;
		display: flex;
		justify-content: end;
		align-items: end;

		@media (max-width: 1200px) {
			right: 16px;
			bottom: 90px;
		}

		@media (max-width: 480px) {
			display: none;
		}
	}
</style>
