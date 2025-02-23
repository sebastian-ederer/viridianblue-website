<script lang="ts">
	import { onMount } from 'svelte';

	let { audio } = $props<{
		audio: HTMLAudioElement;
		audioContext: AudioContext;
	}>();

	let inputValue: number = $state(0);
	let progressElement: HTMLDivElement;
	let inputElement: HTMLInputElement;
	let duration: number = 1; // Default to 1 to avoid division errors
	let isDragging = false;

	// Updates the slider when the song progress changes
	function updateProgress() {
		if (audio && !isDragging) {
			inputValue = audio.currentTime / duration;
			updateGradient();
		}
	}

	function updateGradient() {
		const percentage = inputValue * 100;
		progressElement.style.setProperty('--percentage', `${percentage}%`);
	}

	function handleDrag() {
		isDragging = true;
		updateGradient();
	}

	// Seek function: Moves the audio to selected position
	function handleSeek(e: any) {
		e.stopPropagation();
		isDragging = false;
		if (audio) {
			audio.currentTime = inputValue * duration;
		}
	}

	// Attach event listeners when component is mounted
	onMount(() => {
		if (audio) {
			duration = audio.duration;
			updateProgress();
			audio.addEventListener('timeupdate', updateProgress);
		}

		return () => {
			audio.removeEventListener('timeupdate', updateProgress);
		};
	});
</script>

<div class="progress" bind:this={progressElement}>
	<div class="progress-bar"></div>
	<input
		bind:this={inputElement}
		bind:value={inputValue}
		type="range"
		class="progress-input"
		oninput={handleDrag}
		onchange={handleSeek}
		min="0"
		max="1"
		step="0.001"
	/>
</div>

<style lang="scss">
	.progress {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.5;

		&:hover,
		&:active {
			opacity: 1;
		}
	}

	.progress-bar {
		position: absolute;
		width: calc(100% - 6px);
		height: 4px;
		border-radius: 3px;
		border: 1px solid #002958;
		background: linear-gradient(to right, #002958 var(--percentage), #fff var(--percentage));
		cursor: pointer;
	}

	.progress-input {
		width: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
