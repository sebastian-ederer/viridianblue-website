<script lang="ts">
	const getRayColor = () => {
		const sunRayColors = [
			'#FFFFFF',
			'#FFF9F0',
			'#FFFFF5',
			'#FFFDF0',
			'#FFFCE6',
			'#FFFBEB',
			'#FFF9E6',
			'#FFF8E0',
			'#FFF7DA'
		];
		const randomIndex = Math.floor(Math.random() * sunRayColors.length);
		return sunRayColors[randomIndex];
	};
</script>

<div class="sun-rays">
	{#each { length: 20 } as _, i}
		<span
			class={`ray${i}`}
			style="background: linear-gradient(to bottom, {getRayColor()} 0%, {getRayColor()} 60%, rgba(255, 255, 255, 0) 100%);"
		>
		</span>
	{/each}
</div>

<style lang="scss">
	@use 'sass:math';

	.sun-rays {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100dvh;
		transform-style: preserve-3d;
		overflow: hidden;
		filter: blur(3px);
	}

	@for $i from 1 through 20 {
		.ray#{$i} {
			top: calc(((100dvw + 100dvh) / 4) * -1);
			left: -8.75em;
			position: absolute;
			width: calc((math.random(100) + 30) / 16) + em;
			height: calc(100dvw + 100dvh);
			clip-path: polygon(50% 10%, 100% 100%, 0 100%);
			transform-origin: top right;

			transform: rotate(calc((math.random(20) + 5) * -1) + deg);

			display: block;
			mix-blend-mode: hard-light;
			box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
			opacity: 0;
			animation-name: blinkRay;
			animation-duration: calc(math.random(5) + 1) + s;
			animation-delay: calc(($i - 1) * math.random(20)) + s;
			animation-iteration-count: infinite;
			animation-direction: alternate;
			animation-timing-function: ease-in-out;
		}

		// Mobile-specific styles (smaller rotation angles)
		@media (min-width: 480px) {
			.ray#{$i} {
				transform: rotate(calc((math.random(40) + 7) * -1) + deg);
			}
		}

		// Tablet-specific styles (intermediate rotation angles)
		@media (min-width: 768px) {
			.ray#{$i} {
				transform: rotate(calc((math.random(55) + 8) * -1) + deg);
			}
		}
	}

	@keyframes blinkRay {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 0.7;
		}
	}
</style>
