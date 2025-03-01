<div class="leaves">
	{#each { length: 3 } as _, i}
		<span class={[`leaf${i}`, 'falling-leaf']}> </span>
	{/each}
</div>

<style lang="scss">
	@use 'sass:math';

	.falling-leaf {
		background-image: url('/fall-leafes.png');
		background-size: cover;
		background-size: 400% 400%;
		width: 64px;
		height: 64px;
	}

	@for $i from 1 through 3 {
		.leaf#{$i} {
			position: absolute;
			left: calc(random(100) * 1%);
			color: hsl(random(40) + 20, 70%, 50%);
			animation-name: fall-animation;
			animation-duration: calc(math.random(2) + 6) + s;
			animation-delay: calc(($i - 1) * math.random(15)) + s;
			animation-iteration-count: infinite;
			animation-timing-function: ease-in-out;
		}
	}

	@keyframes fall-animation {
		0% {
			transform: translate3d(0, -10vh, 0) rotate(#{random(20) - 10}deg);
			opacity: 1;
		}
		15% {
			transform: translate3d(#{random(12) - 6}vw, 15vh, 0) rotate(#{random(40)}deg);
			opacity: 0.95;
		}
		30% {
			transform: translate3d(#{random(20) - 10}vw, 35vh, 0) rotate(#{random(90) + 30}deg);
			opacity: 0.85;
		}
		45% {
			transform: translate3d(#{random(16) - 8}vw, 50vh, 0) rotate(#{random(30) + 10}deg);
			opacity: 0.75;
		}
		60% {
			transform: translate3d(#{random(12) - 6}vw, 65vh, 0) rotate(#{random(90) + 20}deg);
			opacity: 0.6;
		}
		75% {
			transform: translate3d(#{random(8) - 4}vw, 80vh, 0) rotate(#{random(20)}deg);
			opacity: 0.4;
		}
		90% {
			transform: translate3d(#{random(4) - 2}vw, 95vh, 0) rotate(#{random(80) + 20}deg);
			opacity: 0.2;
		}
		100% {
			transform: translate3d(0, 110vh, 0) rotate(#{random(10) - 5}deg);
			opacity: 0;
		}
	}
</style>
