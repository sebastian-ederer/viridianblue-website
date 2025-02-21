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

		// &--one {
		// 	transform: scale(0.2);
		// }

		// &--two {
		// 	transform: scale(0.25);
		// }
	}

	.bird-container {
		position: absolute;
		left: -10%;
		transform: scale(0) translateX(-10vw);
		will-change: transform;

		animation-name: fly-right;
		animation-timing-function: linear;
		animation-iteration-count: infinite;

		&--one {
			top: 15%;
			animation-duration: 20s;
		}

		&--two {
			top: 25%;
			animation-duration: 20s;
			animation-delay: 5s;
		}

		@media (max-width: 1200px) {
			&--one {
				animation-duration: 15s;
			}

			&--two {
				animation-duration: 15s;
				animation-delay: 4s;
			}
		}

		@media (max-width: 768px) {
			&--one {
				animation-duration: 10s;
			}

			&--two {
				animation-duration: 10s;
				animation-delay: 3s;
			}
		}

		@media (max-width: 480px) {
			&--one {
				animation-duration: 7s;
			}

			&--two {
				animation-duration: 7s;
				animation-delay: 2s;
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
			transform: translateX(-10vw);
		}

		10% {
			transform: translateY(7px) translateX(0vw);
		}

		20% {
			transform: translateY(15px) translateX(14vw);
		}

		30% {
			transform: translateY(30px) translateX(28vw);
		}

		40% {
			transform: translateY(20px) translateX(42vw);
		}

		50% {
			transform: translateY(15px) translateX(56vw);
		}

		60% {
			transform: translateY(20px) translateX(70vw);
		}

		70% {
			transform: translateY(25px) translateX(84vw);
		}

		80% {
			transform: translateY(30px) translateX(98vw);
		}

		90% {
			transform: translateY(20px) translateX(112vw);
		}

		100% {
			transform: translateY(0x) translateX(112vw);
		}
	}
</style>
