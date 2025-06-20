<script lang="ts">
	import '@fontsource-variable/dancing-script';

	let { audio, audioContext } = $props<{
		audio: HTMLAudioElement | undefined;
		audioContext: AudioContext;
	}>();
	let isPlaying = $state(false);

	const playSong = async () => {
		if (audioContext.state === 'suspended') {
			await audioContext.resume();
		}

		audio?.play();
		isPlaying = true;
	};

	const pauseSong = () => {
		audio?.pause();
		isPlaying = false;
	};
</script>

{#if !isPlaying}
	<button aria-label="play and pause music" class="audioControl" onclick={playSong}>
		<div class="playIconWrapper">
			<svg width="40" height="40" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg">
				<g id="color" />
				<g id="hair" />
				<g id="skin" />
				<g id="skin-shadow" />
				<g id="line">
					<path
						fill="none"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						stroke-width="2"
						d="M19.5816,55.6062 c0.4848,0.1782,1.0303,0.297,1.5758,0.297c0.8485,0,1.697-0.297,2.4242-0.7722l30-15.9793l0.303-0.297 c0.7879-0.7722,1.2121-1.7227,1.2121-2.7919c0-1.0692-0.4242-2.0791-1.2121-2.7919l-0.303-0.297l-30-16.0981 c-1.0909-0.8316-2.6667-1.0098-4-0.4752c-1.5152,0.594-2.4848,2.0791-2.4848,3.683v31.8397 C17.0967,53.5272,18.0664,55.0122,19.5816,55.6062z"
					/>
				</g>
			</svg>
		</div>
	</button>
{:else}
	<button aria-label="pause music" class="audioControl" onclick={pauseSong}>
		<div class="pauseIconWrapper">
			<div class="pause-icon"></div>
		</div>
	</button>
{/if}

<style lang="scss">
	.audioControl {
		border-radius: 50%;
		width: 4.5em;
		height: 4.5em;
		padding: 0;
		border: none;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid rgb(var(--color-primary));
		cursor: pointer;
		opacity: 0.7;

		&:hover,
		&:active {
			opacity: 1;
		}

		svg {
			stroke: rgb(var(--color-primary));
		}
	}

	.playIconWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.25em;
	}

	.pauseIconWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pause-icon {
		width: 1.5em;
		height: 2em;
		position: relative;
		display: inline-block;
	}

	.pause-icon::before,
	.pause-icon::after {
		content: '';
		position: absolute;
		width: 0.5em;
		height: 2em;
		border: 1px solid rgb(var(--color-primary));
		border-radius: 0.25em;
	}

	.pause-icon::before {
		left: 0;
	}

	.pause-icon::after {
		right: 0;
	}
</style>
