<div class="leaves">
	{#each { length: 5 } as _, i}
		<span class={[`leaf${i}`, 'falling-leaf']}> </span>
	{/each}
</div>

<style lang="scss">
	@use 'sass:math';
	@use 'sass:list';

	.falling-leaf {
		background-image: url('/fall-leafes.png');
		background-size: cover;
		background-size: 400% 400%;

		position: absolute;
	}

	$leaf-positions: (10%, 30%, 50%, 70%, 90%); // Adjusted leaf positions
	$num-positions: list.length($leaf-positions);

	@function random-float($min, $max) {
		@return $min + (math.random() * ($max - $min));
	}

	@for $i from 0 through 4 {
		.leaf#{$i} {
			left: list.nth($leaf-positions, ($i % $num-positions) + 1);
			animation-name: fall-animation#{$i};
			animation-duration: random-float(6s, 10s);
			animation-delay: random-float(0s, 10s);
			animation-iteration-count: infinite;
			animation-timing-function: ease-in-out;
			transform-origin: center center;
			$initial-scale: random-float(0.5, 1);
			width: calc(4em * $initial-scale);
			height: calc(4em * $initial-scale);
			filter: hue-rotate(#{random-float(-20, 20)}deg);
		}

		@keyframes fall-animation#{$i} {
			0% {
				transform: translate3d(0, -10dvh, 0) rotate(#{random-float(-15deg, 15deg)}) scale(1);
				opacity: 0;
			}
			10% {
				opacity: random-float(0.7, 1);
			}
			25% {
				transform: translate3d(#{random-float(-8dvw, 8dvw)}, 25dvh, 0)
					rotate(#{random-float(0deg, 360deg)}) scale(random-float(0.9, 1.1));
				opacity: random-float(0.6, 0.9);
			}
			50% {
				transform: translate3d(#{random-float(-12dvw, 12dvw)}, 50dvh, 0)
					rotate(#{random-float(0deg, 360deg)}) scale(random-float(0.8, 1.2));
				opacity: random-float(0.4, 0.7);
			}
			75% {
				transform: translate3d(#{random-float(-6dvw, 6dvw)}, 75dvh, 0)
					rotate(#{random-float(0deg, 360deg)}) scale(random-float(0.9, 1.1));
				opacity: random-float(0.2, 0.5);
			}
			90% {
				opacity: random-float(0.1, 0.3);
			}
			100% {
				transform: translate3d(0, 110dvh, 0) rotate(#{random-float(-10deg, 10deg)}) scale(1);
				opacity: 0;
			}
		}
	}
</style>
