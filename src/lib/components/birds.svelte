<div class={['bird-container', 'bird-container--one']}>
	<div class={['bird', 'bird--one']}></div>
</div>

<div class={['bird-container', 'bird-container--two']}>
	<div class={['bird', 'bird--two']}></div>
</div>

<style lang="scss">
	.bird {
		background-image: url(/bird-cells-new.svg);
		background-size: auto 100%;
		width: 22px;
		height: 31px;
		animation-name: fly-cycle;
		animation-timing-function: steps(10);
		animation-iteration-count: infinite;
		animation-duration: 0.5s;
	}

	.bird-container {
		position: absolute;
		left: -10%;
		transform: scale(0) translateX(-10dvw);
		will-change: transform;

		animation-name: fly-right;
		animation-timing-function: linear;
		animation-iteration-count: infinite;

		&--one {
			top: 15%;
			animation-duration: 7s;
		}

		&--two {
			top: 25%;
			animation-duration: 7s;
			animation-delay: 2s;
		}

		@media (min-width: 480px) {
			&--one {
				animation-duration: 10s;
			}

			&--two {
				animation-duration: 10s;
				animation-delay: 3s;
			}
		}

		@media (min-width: 768px) {
			&--one {
				animation-duration: 15s;
			}

			&--two {
				animation-duration: 15s;
				animation-delay: 4s;
			}
		}

		@media (min-width: 1200px) {
			&--one {
				animation-duration: 20s;
			}

			&--two {
				animation-duration: 20s;
				animation-delay: 5s;
			}
		}
	}

	@keyframes fly-cycle {
		100% {
			background-position: -225px 0;
		}
	}

	@keyframes fly-right {
		0% {
			transform: translateX(-10dvw);
		}

		10% {
			transform: translateY(7px) translateX(0dvw);
		}

		20% {
			transform: translateY(15px) translateX(14dvw);
		}

		30% {
			transform: translateY(30px) translateX(28dvw);
		}

		40% {
			transform: translateY(20px) translateX(42dvw);
		}

		50% {
			transform: translateY(15px) translateX(56dvw);
		}

		60% {
			transform: translateY(20px) translateX(70dvw);
		}

		70% {
			transform: translateY(25px) translateX(84dvw);
		}

		80% {
			transform: translateY(30px) translateX(98dvw);
		}

		90% {
			transform: translateY(20px) translateX(112dvw);
		}

		100% {
			transform: translateY(0x) translateX(112dvw);
		}
	}
</style>
