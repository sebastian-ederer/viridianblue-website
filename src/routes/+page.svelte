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
			analyser.fftSize = 128;
			frequencyData = new Uint8Array(analyser.frequencyBinCount);
		}
	}

	function setupAudioVisualizer() {
		if (!canvas) return;

		canvasCtx = canvas.getContext('2d');
		canvasWidth = window.innerWidth;
		canvasHeight = 200;
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

		// Update frequency data.
		analyser.getByteFrequencyData(frequencyData);
		canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas

		const totalBars = frequencyData.length / 2; // Half for left, half for right
		const minBarHeight = 15; // Minimum bar height
		const borderRadius = 5; // Corner rounding

		// Calculate total space available for bars (leave 10% for gaps)
		const totalGapSpace = canvasWidth * 0.1; // 10% reserved for gaps
		const totalAvailableWidth = canvasWidth - totalGapSpace;

		// Calculate perfect bar width and gap to evenly distribute across canvas
		const dynamicBarWidth = totalAvailableWidth / (2 * totalBars);
		const gap = totalGapSpace / (2 * totalBars);

		// Center X position
		const centerX = canvasWidth / 2;

		let xRight = centerX + gap; // Right side starts from the center
		let xLeft = centerX - dynamicBarWidth - gap; // Left side starts just before center

		for (let i = 0; i < totalBars; i++) {
			// Heights for left and right bars
			let barHeight = (frequencyData[i] / 255) * canvasHeight;

			// Ensure minimum height
			barHeight = Math.max(barHeight, minBarHeight);

			// Set bar color
			canvasCtx.fillStyle = 'rgb(255, 255, 255)';

			// Draw left side (mirrored left data)
			drawRoundedRect(
				canvasCtx,
				xLeft,
				canvasHeight - barHeight,
				dynamicBarWidth,
				barHeight,
				borderRadius
			);

			// Draw right side (original frequency data)
			drawRoundedRect(
				canvasCtx,
				xRight,
				canvasHeight - barHeight,
				dynamicBarWidth,
				barHeight,
				borderRadius
			);

			// Move positions outward
			xLeft -= dynamicBarWidth + gap;
			xRight += dynamicBarWidth + gap;
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
	});
</script>

<div class="home">
	<div class={'audioWrapper'}>
		<audio controls bind:this={audio} loop volume="0.2">
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
		z-index: 10;
	}

	/* Canvas container styling to place the visualization at the bottom of the page */
	.canvas-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		z-index: 1;
	}

	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
