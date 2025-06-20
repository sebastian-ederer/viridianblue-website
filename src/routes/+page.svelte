<script lang="ts">
	import AudioProgressControl from '$lib/components/audioProgressControl.svelte';
	import AudioWave from '$lib/components/audioWave.svelte';
	import Background from '$lib/components/background.svelte';
	import Menu from '$lib/components/menu.svelte';
	import PlayPauseButton from '$lib/components/playPauseButton.svelte';
	import VolumeControl from '$lib/components/volumeControl.svelte';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement | undefined = $state();
	let audioContext: AudioContext | undefined = $state();
	let volume = $state(0.2);
	let muted = $state(false);
	let audioWaveHeight: number = $state(80);
	let isSafari = $state(false); // Safari does not support volume controls

	const onWindowResize = () => {
		audioWaveHeight = window.innerWidth > 1200 ? 120 : 80;
		if (window.innerWidth <= 480 || isSafari) {
			volume = 1;
		}
	};

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

<svelte:head>
	<title>Viridian Blue</title>
	<link rel="preload" href="/forrest-base-bg-summer.png" as="image" />
</svelte:head>

<div class="mobile-menu">
	<Menu />
</div>
<div class="home">
	<Background />

	<div class="menu">
		<a class="active" href="/">Home</a>
		<div class="menu-group">
			<a href="/about"> About </a>

			<div class="dropdown">
				<a href="/imprint">Imprint </a>
			</div>
		</div>

		<a href="/experience">Experience</a>
	</div>

	<div class={'audioWrapper'} style="z-index: 10">
		<audio bind:this={audio} loop {volume} {muted}>
			<source src={'/sus-falling-tears-edm.mp3'} type="audio/mpeg" />
			<source src={'/sus-falling-tears-edm.ogg'} type="audio/ogg" />
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
		padding: 1.25em;
		width: 100%;
		gap: 1.5em;
	}

	.heading {
		font-size: 3rem;
		font-family: 'Dancing Script Variable', cursive;
		font-weight: bold;
		color: rgb(var(--color-primary));
		text-align: center;
		user-select: none;
		z-index: 1;
		margin: 0;

		@media (min-width: 480px) {
			font-size: 4rem;
		}

		@media (min-width: 768px) {
			font-size: 5rem;
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
		display: flex;
		justify-content: end;
		align-items: end;
		display: none;

		@media (min-width: 480px) {
			display: flex;
			right: 1em;
			bottom: 5.625em;
		}

		@media (min-width: 1200px) {
			right: 2em;
			bottom: 8.125em;
		}
	}

	@media (min-width: 480px) {
		.mobile-menu {
			display: none;
		}
	}

	.menu {
		display: none;
		position: fixed;
		z-index: 9;
		top: 1.875em;
		gap: 1.875em;

		a {
			font-weight: 500;
			color: #2c3e50;
			text-decoration: none;
			margin: 0;
			position: relative;
			transition: color 0.3s ease;

			&::after {
				content: '';
				position: absolute;
				width: 0%;
				height: 0.125em;
				left: 0;
				bottom: -0.25em;
				background-color: #73c6b6;
				transition: width 0.3s ease;
			}

			&:hover {
				color: #73c6b6;
			}

			&:hover::after {
				width: 100%;
			}

			&.active {
				color: #73c6b6;

				&::after {
					width: 100%;
				}
			}
		}

		@media (min-width: 480px) {
			display: flex;
		}

		@media (min-width: 768px) {
			top: 3.75em;
			gap: 3.125em;
		}
	}

	.menu-group {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.menu-group:hover .dropdown {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.dropdown {
		padding: 0.75em 0 0 3.75em;
		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: 480px) {
			position: absolute;
			top: 100%;
			border-radius: 0 0 4px 4px;
			overflow: hidden;
			z-index: 10;
			min-width: calc(100% + 0.5em);
			margin-top: 0;
			padding: 1.25em 0.375em;
			width: calc(100% - 1.125em);

			opacity: 0;
			transform: translateY(-0.625em);
			transition:
				opacity 0.3s ease,
				transform 0.3s ease;
		}

		a {
			height: fit-content;
		}
	}
</style>
