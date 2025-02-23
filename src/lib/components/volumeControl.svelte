<script lang="ts">
	import '@fontsource-variable/dancing-script';

	let { volume = $bindable(0.2) } = $props();
	let volumeElement: HTMLDivElement | null = null;

	function handleTouchStart() {
		if (volumeElement) {
			volumeElement.style.opacity = '1';
		}
	}

	function handleTouchEnd() {
		if (volumeElement) {
			volumeElement.style.opacity = '0.65';
		}
	}
</script>

<div class={'volume'} bind:this={volumeElement}>
	<input
		class={'volume-input'}
		bind:value={volume}
		type="range"
		min="0"
		max="1"
		step="0.01"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	/>
</div>

<style lang="scss">
	.volume {
		transform: rotate(270deg);
		display: flex;
		width: 100px;
		height: 30px;
		opacity: 0.65;
	}

	.volume:hover,
	.volume:active {
		opacity: 1;
	}

	.volume-input {
		appearance: none;
		width: 100%;
		cursor: pointer;
		background: transparent;
	}

	.volume-input::-moz-range-track {
		outline: #002958 solid 1px;
		background-color: #fff;
		height: 6px;
		border-radius: 3px;
	}

	.volume-input::-moz-range-progress {
		background-color: #002958;
		height: 6px;
	}

	.volume-input::-moz-range-thumb {
		background-color: #ffffff;
		outline: #002958 solid 1px;

		width: 16px;
		height: 16px;
		border: none;
		border-radius: 50%;
	}
</style>
