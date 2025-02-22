<script lang="ts">
	import '@fontsource-variable/dancing-script';
	import Bird from '$lib/components/bird.svelte';
	import PlayIcon from '$lib/components/playIcon.svelte';
	import PauseIcon from '$lib/components/pauseIcon.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement;
	let audioContext: AudioContext;
	let analyser: AnalyserNode;
	let frequencyData: Uint8Array;
	let isPlaying = $state(false);

	let canvas: HTMLCanvasElement;
	let canvasCtx: CanvasRenderingContext2D | null;

	let canvasWidth: number;
	let canvasHeight: number;

	function setupAudio() {
		if (!audioContext) {
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			const source = audioContext.createMediaElementSource(audio);
			source.connect(analyser);
			analyser.connect(audioContext.destination);
			updateFFTSize();
			frequencyData = new Uint8Array(analyser.frequencyBinCount);
		}
	}

	// Function to dynamically adjust FFT size
	function updateFFTSize() {
		const fixedBarWidth = 10; // Fixed bar width in pixels
		const screenBars = Math.floor(window.innerWidth / (fixedBarWidth * 2)); // Number of bars needed

		// Find the closest power of 2 that can accommodate at least 'screenBars' frequency bins
		let fftSize = 32; // Start with the smallest valid FFT size
		while (fftSize / 2 < screenBars) {
			fftSize *= 2;
		}

		analyser.fftSize = fftSize;
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
	}

	function setupAudioVisualizer() {
		if (!canvas) return;

		canvasCtx = canvas.getContext('2d');
		canvasWidth = window.innerWidth;
		canvasHeight = 100;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvasCtx?.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	function drawRoundedRect(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number
	) {
		ctx.beginPath();
		// Start at bottom-left
		ctx.moveTo(x, y + height);
		// Left edge up to where the round starts
		ctx.lineTo(x, y + radius);
		// Top-left corner curve
		ctx.arcTo(x, y, x + radius, y, radius);
		// Top edge to before top-right corner
		ctx.lineTo(x + width - radius, y);
		// Top-right corner curve
		ctx.arcTo(x + width, y, x + width, y + radius, radius);
		// Right edge down to bottom-right
		ctx.lineTo(x + width, y + height);
		// Close the path (bottom edge)
		ctx.closePath();
		ctx.fill();
	}

	function draw() {
		if (canvasCtx === null) return;
		requestAnimationFrame(draw);

		// Update frequency data
		analyser.getByteFrequencyData(frequencyData);
		canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

		const minBarHeight = 10; // Minimum bar height
		const maxBarHeight = 80; // Maximum bar height
		const borderRadius = 5; // Corner rounding
		const fixedBarWidth = 10; // Fixed bar width

		// Compute how many bars we actually have
		const totalBars = frequencyData.length / 2; // Half for left, half for right

		// Calculate the gap dynamically to distribute bars evenly
		const totalAvailableWidth = canvasWidth; // Reserve 10% of width for gaps
		const gap = (totalAvailableWidth - totalBars * fixedBarWidth * 2) / (2 * totalBars);
		const centerX = canvasWidth / 2;

		let xRight = centerX + gap; // Right side starts from the center
		let xLeft = centerX - fixedBarWidth; // Left side starts just before center

		for (let i = 0; i < totalBars; i++) {
			// Heights for left and right bars
			let barHeight = (frequencyData[i] / 255) * canvasHeight;

			// Ensure minimum height
			barHeight = Math.max(barHeight, minBarHeight);
			barHeight = Math.min(barHeight, maxBarHeight);

			// Set bar color
			canvasCtx.fillStyle = 'rgb(255, 255, 255)';

			// Draw left side (mirrored left data)
			drawRoundedRect(
				canvasCtx,
				xLeft,
				canvasHeight - barHeight,
				fixedBarWidth,
				barHeight,
				borderRadius
			);

			// Draw right side (original frequency data)
			drawRoundedRect(
				canvasCtx,
				xRight,
				canvasHeight - barHeight,
				fixedBarWidth,
				barHeight,
				borderRadius
			);

			// Move positions outward
			xLeft -= fixedBarWidth + gap;
			xRight += fixedBarWidth + gap;
		}
	}

	function init() {
		setupAudio();
		setupAudioVisualizer();
		draw();
	}

	function playSong() {
		audio.play();
		isPlaying = true;
	}

	function pauseSong() {
		audio.pause();
		isPlaying = false;
	}

	onMount(() => {
		init();

		window.addEventListener('resize', () => {
			updateFFTSize();
			setupAudioVisualizer(); // Recalculate canvas size
		});

		return () => {
			window.removeEventListener('resize', () => {
				updateFFTSize();
				setupAudioVisualizer(); // Recalculate canvas size
			});
		};
	});
</script>

<div class="home">
	<div class={'audioWrapper'}>
		<audio bind:this={audio} loop volume="0.2">
			<source src={'/porter-robinson-sea-of-voices.mp3'} type="audio/mpeg" />
			<source src={'/porter-robinson-sea-of-voices.ogg'} type="audio/ogg" />
		</audio>
	</div>

	<div class="heading-wrapper">
		<h1 class="heading">Viridian Blue</h1>
		{#if !isPlaying}
			<button aria-label="play music" class="playAudio" onclick={playSong}>
				<div class="playIconWrapper">
					<PlayIcon />
				</div>
			</button>
		{:else}
			<button aria-label="pause music" class="playAudio" onclick={pauseSong}>
				<div class="pauseIconWrapper">
					<PauseIcon />
				</div>
			</button>
		{/if}
	</div>

	<Bird />

	<SunRays />

	<!-- Canvas container for the audio visualization placed at the bottom -->
	<div class="canvas-container">
		<canvas bind:this={canvas}></canvas>
	</div>
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
		margin-top: 30vh;
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

	.playAudio {
		border-radius: 50%;
		width: 70px;
		height: 70px;
		padding: 0;
		border: none;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid rgb(156, 156, 156);
		cursor: pointer;

		&:hover {
			background-color: rgba(255, 255, 255, 0.5);
		}
	}

	.playIconWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 4px;
	}

	.pauseIconWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.audioWrapper {
		position: absolute;
	}

	/* Canvas container styling to place the visualization at the bottom of the page */
	.canvas-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}

	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
