<script lang="ts">
	import AudioWave from '$lib/components/audioWave.svelte';
	import Bird from '$lib/components/bird.svelte';
	import Particles from '$lib/components/particles.svelte';
	import PlayPauseButton from '$lib/components/playPauseButton.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
	import VolumeControl from '$lib/components/volumeControl.svelte';
	import '@fontsource-variable/dancing-script';

	let audio: HTMLAudioElement | undefined = $state(undefined);
	let volume = $state(0.2);
	let muted = $state(false);
</script>

<div class="home">
	<div class={'audioWrapper'} style="z-index: 10">
		<audio controls bind:this={audio} loop {volume} {muted}>
			<source src={'/porter-robinson-sea-of-voices.mp3'} type="audio/mpeg" />
			<source src={'/porter-robinson-sea-of-voices.ogg'} type="audio/ogg" />
		</audio>
	</div>

	<div class="heading-wrapper">
		<h1 class="heading">Viridian Blue</h1>
		<PlayPauseButton {audio} />
	</div>

	<Bird />
	<SunRays />
	<Particles />

	<div class={'volume-wrapper'}>
		<VolumeControl bind:volume bind:muted />
	</div>

	<AudioWave {audio} height={80} />
</div>

<style lang="scss">
	.home {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.heading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30dvh;
		padding: 20px;

		@media (max-width: 480px) {
			margin-top: 10dvh;
		}
	}

	.heading {
		font-size: 5rem;
		font-family: 'Dancing Script Variable', cursive;
		font-weight: bold;
		color: rgb(0, 41, 88);
		text-align: center;
		user-select: none;
		z-index: 1;
		margin-bottom: 20px;
	}

	.audioWrapper {
		position: absolute;
	}

	.volume-wrapper {
		position: absolute;
		right: -55px;
		bottom: 150px;
	}
</style>
