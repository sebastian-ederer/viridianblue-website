<script lang="ts">
	import '@fontsource-variable/dancing-script';
	import { onMount } from 'svelte';

	let {
		audio,
		audioContext,
		height = 80
	} = $props<{ audio: HTMLAudioElement; audioContext: AudioContext; height: number }>();

	let analyser: AnalyserNode;
	let frequencyData: Uint8Array;
	let canvas: HTMLCanvasElement;
	let canvasCtx: CanvasRenderingContext2D | null;

	let canvasWidth: number;
	let canvasHeight: number;

	const setupAudio = () => {
		analyser = audioContext.createAnalyser();
		const source = audioContext.createMediaElementSource(audio);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		updateFFTSize();
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
	};

	// Function to dynamically adjust FFT size
	const updateFFTSize = () => {
		const fixedBarWidth = 10; // Fixed bar width in pixels
		const screenBars = Math.floor(window.innerWidth / (fixedBarWidth * 2)); // Number of bars needed

		// Find the closest power of 2 that can accommodate at least 'screenBars' frequency bins
		let fftSize = 32; // Start with the smallest valid FFT size
		while (fftSize / 2 < screenBars) {
			fftSize *= 2;
		}

		analyser.fftSize = fftSize;
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
	};

	const setupAudioVisualizer = () => {
		if (!canvas) return;

		canvasCtx = canvas.getContext('2d');
		canvasWidth = window.innerWidth;
		canvasHeight = height;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvasCtx?.clearRect(0, 0, canvasWidth, canvasHeight);
	};

	const drawRoundedRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number
	) => {
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
	};

	const draw = () => {
		if (canvasCtx === null) return;
		requestAnimationFrame(draw);

		// Update frequency data
		analyser.getByteFrequencyData(frequencyData);
		canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

		const minBarHeight = 10; // Minimum bar height
		const borderRadius = 5; // Corner rounding
		const fixedBarWidth = 10; // Fixed bar width

		// Compute how many bars we actually have
		const totalBars = frequencyData.length / 2; // Half for left, half for right

		// Calculate the gap dynamically to distribute bars evenly
		const totalAvailableWidth = canvasWidth; // Reserve 10% of width for gaps
		const calculatedGap = Math.max(
			2,
			(totalAvailableWidth - totalBars * fixedBarWidth * 2) / (2 * totalBars)
		);
		const gap = Math.min(5, calculatedGap);
		const centerX = canvasWidth / 2;

		let xRight = centerX + gap; // Right side starts from the center
		let xLeft = centerX - fixedBarWidth; // Left side starts just before center

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
	};

	const init = () => {
		setupAudio();
		setupAudioVisualizer();
		draw();
	};

	onMount(() => {
		init();

		const handleResize = () => {
			updateFFTSize();
			setupAudioVisualizer();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="canvas-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
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
