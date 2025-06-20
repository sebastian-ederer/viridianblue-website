<script>
	let snowflakes = Array.from({ length: 50 }, (_, index) => index);
</script>

<div class="initial-snow">
	{#each snowflakes as snowflake}
		<div class="snow" style="--index: {snowflake}">&#10052;</div>
	{/each}
</div>

<style lang="scss">
	@use 'sass:math';

	.initial-snow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: transparent;
	}

	.initial-snow > * {
		font-size: 1.875em;
		color: white;
		position: absolute;
		top: -5dvh;
	}

	@keyframes snowfall {
		0% {
			transform: translate3d(var(--left-ini), 0, 0);
		}
		100% {
			transform: translate3d(var(--left-end), 110dvh, 0);
		}
	}

	.snow {
		&:nth-child(2n) {
			font-size: 1.5625em;
		}
		&:nth-child(4n) {
			filter: blur(0.0625em);
			font-size: 1.25em;
		}
		&:nth-child(6n) {
			filter: blur(0.125em);
			font-size: 0.9375em;
		}
		&:nth-child(8n) {
			filter: blur(0.1875em);
			font-size: 0.75em;
		}
		&:nth-child(10n) {
			filter: blur(0.25em);
			font-size: 0.625em;
		}
		&:nth-child(17n) {
			filter: blur(0.375em);
			font-size: 0.375em;
		}
	}

	@function random-float($min, $max) {
		@return $min + (math.random() * ($max - $min));
	}

	@for $i from 0 through 18 {
		$left-ini: random-float(-10dvw, 10dvw);
		$left-end: random-float(-10dvw, 10dvw);
		$left: random-float(0dvw, 90dvw);
		$duration: random-float(6s, 15s);
		$delay: random-float(-8s, -1s);

		.snow:nth-child(#{$i}) {
			--left-ini: #{$left-ini};
			--left-end: #{$left-end};
			left: #{$left};
			animation: snowfall #{$duration} linear infinite;
			animation-delay: #{$delay};
		}
	}

	@for $i from 19 through 49 {
		$left-ini: random-float(-10dvw, 10dvw);
		$left-end: random-float(-10dvw, 10dvw);
		$left: random-float(0dvw, 90dvw);
		$duration: random-float(6s, 15s);
		$delay: random-float(-15s, 0s);

		.snow:nth-child(#{$i}) {
			--left-ini: #{$left-ini};
			--left-end: #{$left-end};
			left: #{$left};
			animation: snowfall #{$duration} linear infinite;
			animation-delay: #{$delay};
		}
	}
</style>
