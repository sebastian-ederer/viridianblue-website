<script lang="ts">
	import '@fontsource-variable/dancing-script';

	function getRayColor() {
		const sunRayColors = [
			'#FFFFFF', // Pure white
			'#FFF9F0', // Very light off-white (slightly warmer)
			'#FFFFF5', // Slightly whiter than #FFF9F0 (slightly warmer)
			'#FFFDF0', // Very light yellowish off-white (subtle warmth)
			'#FFFCE6', // Light yellowish-white (subtle warmth)
			'#FFFBEB', // Another light yellowish-white (subtle warmth)
			'#FFF9E6', // Light yellowish-white (subtle warmth)
			'#FFF8E0', // Light yellowish-white (subtle warmth)
			'#FFF7DA', // Light yellowish-white (subtle warmth)
			'#FFF6D4' // Light yellowish-white (subtle warmth)
		];
		const randomIndex = Math.floor(Math.random() * sunRayColors.length);
		return sunRayColors[randomIndex];
	}
</script>

<div class="home">
	<h1 class="heading">Viridian Blue</h1>

	<div class="sun-rays">
		{#each { length: 20 } as _, i}
			<span
				class={`ray${i}`}
				style="background: linear-gradient(to bottom, {getRayColor()} 0%, {getRayColor()} 50%, rgba(255, 255, 255, 0) 100%);"
			></span>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'sass:math';

	.home {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.heading {
		font-size: 5rem;
		font-family: 'Dancing Script Variable', cursive;
		font-weight: bold;
		color: rgb(0, 41, 88);
		text-align: center;
		user-select: none;
		z-index: 1;
	}

	.sun-rays {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		transform-style: preserve-3d;
		overflow: hidden;
	}

	@for $i from 1 through 20 {
		.ray#{$i} {
			position: absolute;
			top: calc(((100vw + 100vh) / 3) * -1);
			left: -140px;
			width: calc(math.random(100) + 30) + px;
			height: calc(100vw + 100vh);
			clip-path: polygon(50% 10%, 100% 100%, 0 100%);
			transform-origin: top right;
			transform: rotate(calc((math.random(55) + 8) * -1) + deg);
			display: block;
			mix-blend-mode: hard-light;
			box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
			opacity: 0;

			animation-name: blinkRay;
			animation-duration: calc(math.random(5) + 1) + s;
			animation-delay: calc(math.random($i) * math.random(5)) + s;
			animation-iteration-count: infinite;
			animation-direction: alternate;
			animation-timing-function: ease-in-out;
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
