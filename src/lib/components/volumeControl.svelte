<script lang="ts">
	import '@fontsource-variable/dancing-script';
	import { onMount } from 'svelte';

	let { volume = $bindable(0.2), muted = $bindable(false) } = $props<{
		muted: boolean;
		volume: number;
	}>();

	let previousVolume: number = volume;
	let volumeElement: HTMLDivElement | null = null;
	let volumeInput: HTMLInputElement;
	let overlayInput: HTMLInputElement;

	const updateGradient = () => {
		const percentage =
			((volume - parseFloat(volumeInput.min)) /
				(parseFloat(volumeInput.max) - parseFloat(volumeInput.min))) *
			100;

		volumeInput.style.setProperty('--percentage', `${percentage}%`);
	};

	const toggleMuted = () => {
		if (muted) {
			volume = previousVolume;
		} else {
			previousVolume = volume;
			volume = 0;
		}

		muted = !muted;
		updateGradient();
	};

	const handleVolumeChange = () => {
		if (muted && volume > 0) {
			muted = !muted;
		}

		updateGradient();
	};

	onMount(() => {
		updateGradient();
		overlayInput.setAttribute('orient', 'vertical');
	});
</script>

<div class="volume" bind:this={volumeElement}>
	<div class="input-wrapper">
		<div class="center">
			<input
				aria-label="to turn up and down the volume"
				class="volume-input"
				bind:value={volume}
				bind:this={volumeInput}
				type="range"
				min="0"
				max="1"
				step="0.01"
			/>

			<input
				aria-label="to turn up and down the volume"
				bind:value={volume}
				bind:this={overlayInput}
				type="range"
				class="overlay-input"
				min="0"
				max="1"
				step="0.01"
				oninput={handleVolumeChange}
			/>
		</div>

		<button aria-label="mute music" class={'mute-button'} onclick={toggleMuted}>
			{#if muted || volume === 0}
				<svg
					id="fi_2550227"
					enable-background="new 0 0 512 512"
					height="512"
					viewBox="0 0 512 512"
					width="512"
					xmlns="http://www.w3.org/2000/svg"
					><g
						><path
							d="m313.969 19.938c-11.271-6.24-25.583-4.905-39.271 3.663l-167.607 104.932h-51.925c-30.419 0-55.166 24.747-55.166 55.166v144.602c0 30.419 24.747 55.166 55.166 55.166h51.925l167.606 104.933c7.997 5.006 16.206 7.543 23.898 7.543 5.474 0 10.687-1.285 15.373-3.88 11.27-6.241 17.733-19.081 17.733-35.229v-401.668c.001-16.147-6.463-28.987-17.732-35.228zm-217.57 333.529h-41.233c-13.877 0-25.166-11.289-25.166-25.166v-144.602c0-13.877 11.289-25.166 25.166-25.166h41.233zm205.303 103.367c0 6.354-1.817 8.734-2.267 8.983-.451.247-3.43.527-8.818-2.846l-164.218-102.811v-208.32l164.218-102.812c5.389-3.374 8.367-3.093 8.818-2.846.449.249 2.267 2.63 2.267 8.983z"
						></path><path
							d="m470.013 256 37.593-37.594c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-37.593 37.595-37.593-37.594c-5.857-5.858-15.354-5.858-21.213 0-5.858 5.857-5.858 15.355 0 21.213l37.593 37.593-37.593 37.594c-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.464 10.606-4.394l37.593-37.594 37.593 37.594c2.929 2.929 6.767 4.394 10.606 4.394 3.838 0 7.678-1.465 10.606-4.394 5.858-5.857 5.858-15.355 0-21.213z"
						></path></g
					></svg
				>
			{:else}
				<svg
					id="fi_2326033"
					enable-background="new 0 0 512 512"
					height="512"
					viewBox="0 0 512 512"
					width="512"
					xmlns="http://www.w3.org/2000/svg"
					><g
						><path
							d="m437.02 74.979c-5.857-5.857-15.355-5.857-21.213 0s-5.858 15.355 0 21.213c88.117 88.117 88.117 231.496 0 319.615-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394c48.352-48.352 74.981-112.64 74.981-181.021s-26.629-132.668-74.98-181.02z"
						></path><path
							d="m391.574 120.423c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.858-5.858 15.355 0 21.213 30.549 30.548 47.373 71.163 47.373 114.364 0 43.2-16.824 83.815-47.373 114.362-5.857 5.857-5.858 15.354 0 21.213 2.929 2.93 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394c36.215-36.213 56.16-84.361 56.16-135.575.001-51.215-19.944-99.363-56.159-135.577z"
						></path><path
							d="m313.969 19.938c-11.271-6.24-25.583-4.905-39.271 3.663l-167.607 104.932h-51.925c-30.419 0-55.166 24.747-55.166 55.166v144.602c0 30.419 24.747 55.166 55.166 55.166h51.925l167.606 104.933c7.997 5.006 16.206 7.543 23.898 7.543 5.474 0 10.687-1.285 15.373-3.88 11.27-6.241 17.733-19.081 17.733-35.229v-401.668c.001-16.147-6.463-28.987-17.732-35.228zm-217.57 333.529h-41.233c-13.877 0-25.166-11.289-25.166-25.166v-144.602c0-13.877 11.289-25.166 25.166-25.166h41.233zm205.303 103.367c0 6.354-1.817 8.734-2.267 8.983-.451.247-3.43.527-8.818-2.846l-164.218-102.811v-208.32l164.218-102.812c5.389-3.374 8.367-3.093 8.818-2.846.449.249 2.267 2.63 2.267 8.983z"
						></path></g
					></svg
				>
			{/if}
		</button>
	</div>
</div>

<style lang="scss">
	:root {
		--slider-track-height: 0.25em;
		--slider-track-height-correction: -0.375em;
		--slider-thumb-size: 0.75em;
		--slider-thumb-size-correction: 0.25em;
		--slider-color: rgb(var(--color-primary));
		--slider-bg: #fff;
		--percentage: 20%;
	}

	.volume {
		display: flex;
		flex-direction: row;
		justify-content: start;
		height: 9.375em;
		align-items: end;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.375em;
		flex-direction: column;
		justify-content: end;
		opacity: 0.5;
		user-select: none;

		&:hover,
		&:active {
			opacity: 1;
		}
	}

	.mute-button {
		cursor: pointer;
		border: none;
		background: transparent;

		svg {
			height: 1.25em;
			width: 1.25em;
			stroke: var(--slider-color);
			fill: var(--slider-color);
		}
	}

	.center {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.875em;
	}

	.overlay-input {
		transform: rotate(-90deg);
		-webkit-transform: rotate(-90deg);
		-moz-transform: rotate(0deg);
		transform-origin: center center;
		position: relative;
		width: 6.25em;
		height: 6.25em;
		opacity: 0;
		cursor: pointer;
	}

	.volume-input {
		width: 6.25em;
		transform: rotate(-90deg);
		background: linear-gradient(
			to right,
			var(--slider-color) var(--percentage),
			var(--slider-bg) var(--percentage)
		);
		border: solid 1px var(--slider-color);
		border-radius: 0.25em;
		height: var(--slider-track-height);
		transition: background 250ms ease-in-out;
		appearance: none;
		position: absolute;
		pointer-events: none;
		touch-action: none;
	}

	/* Chrome & Safari */
	.volume-input::-webkit-slider-runnable-track {
		background: transparent;
		height: var(--slider-track-height);
		border-radius: 0.25em;
	}

	.volume-input::-webkit-slider-thumb {
		background: var(--slider-color);
		width: calc(var(--slider-thumb-size) + var(--slider-thumb-size-correction));
		height: calc(var(--slider-thumb-size) + var(--slider-thumb-size-correction));
		border-radius: 50%;
		border: 2px solid var(--slider-color);
		margin-top: var(--slider-track-height-correction);
		appearance: none;
		-webkit-appearance: none;
	}

	/* Firefox */
	.volume-input::-moz-range-track {
		background: transparent;
		height: var(--slider-track-height);
		border-radius: 0.25em;
	}

	.volume-input::-moz-range-progress {
		background: var(--slider-color);
		height: var(--slider-track-height);
	}

	.volume-input::-moz-range-thumb {
		background: var(--slider-color);
		width: var(--slider-thumb-size);
		height: var(--slider-thumb-size);
		border-radius: 50%;
		border: 0.125em solid var(--slider-color);
	}

	/* Edge */
	.volume-input::-ms-track {
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	.volume-input::-ms-fill-lower {
		background: var(--slider-color);
	}

	.volume-input::-ms-fill-upper {
		background: var(--slider-bg);
	}

	.volume-input::-ms-thumb {
		background: var(--slider-color);
		width: var(--slider-thumb-size);
		height: var(--slider-thumb-size);
		border-radius: 50%;
		border: 2px solid var(--slider-color);
	}
</style>
