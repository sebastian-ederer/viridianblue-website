<script lang="ts">
	import { onMount } from 'svelte';

	let { audio } = $props<{
		audio: HTMLAudioElement;
	}>();

	let inputValue: number = $state(0);
	let progressElement: HTMLDivElement;
	let inputElement: HTMLInputElement;
	let duration: number = 1; // Default to 1 to avoid division errors
	let isDragging = false;

	// Updates the slider when the song progress changes
	function updateProgress() {
		if (audio && !isDragging && duration > 0) {
			inputValue = audio.currentTime / duration;
			updateGradient();
		}
	}

	// Update progress bar gradient
	function updateGradient() {
		const percentage = inputValue * 100;
		progressElement.style.setProperty('--percentage', `${percentage}%`);
	}

	function handleDrag() {
		isDragging = true;
		updateGradient();
	}

	// Seek function: Moves the audio to selected position
	function handleSeek() {
		isDragging = false;
		if (audio && duration > 0) {
			const newTime = inputValue * duration;
			if (!isNaN(newTime)) {
				audio.currentTime = newTime;
			}
		}
	}

	// Ensure metadata is loaded to get duration
	function handleMetadata() {
		if (audio.duration && !isNaN(audio.duration)) {
			duration = audio.duration;
			updateProgress();
		}
	}

	// Attach event listeners when component is mounted
	onMount(() => {
		if (!audio) return;

		// Ensure metadata is loaded
		if (audio.readyState >= 1) {
			handleMetadata();
		} else {
			audio.addEventListener('loadedmetadata', handleMetadata);
			audio.addEventListener('canplaythrough', handleMetadata); // Fallback
		}

		audio.addEventListener('timeupdate', updateProgress);

		return () => {
			audio.removeEventListener('loadedmetadata', handleMetadata);
			audio.removeEventListener('canplaythrough', handleMetadata);
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
		border: 1px solid rgb(var(--color-primary));
		background: linear-gradient(
			to right,
			rgb(var(--color-primary)) var(--percentage),
			#fff var(--percentage)
		);
		cursor: pointer;
	}

	.progress-input {
		width: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
