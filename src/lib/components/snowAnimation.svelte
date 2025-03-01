<script>
	// Generate an array for snowflakes
	let snowflakes = Array.from({ length: 50 }, (_, index) => index);
</script>

<div class="loader">
	<div class="loader-icon-1">&#10052;</div>
	<div class="loader-text">Loading...</div>
</div>
<div class="main">
	<div class="initial-snow">
		{#each snowflakes as snowflake}
			<div class="snow" style="--index: {snowflake}">&#10052;</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.initial-snow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: transparent; /* Transparent background */
	}

	.initial-snow > * {
		font-size: 50px;
		color: white;
		position: absolute;
		top: -5vh;
	}

	@keyframes snowfall {
		0% {
			transform: translate3d(var(--left-ini), 0, 0);
		}

		100% {
			transform: translate3d(var(--left-end), 110vh, 0);
		}
	}

	.snow:nth-child(2n) {
		filter: blur(1px);
		font-size: 40px;
	}

	.snow:nth-child(6n) {
		filter: blur(2px);
		font-size: 30px;
	}

	.snow:nth-child(10n) {
		filter: blur(5px);
		font-size: 30px;
	}

	.snow:nth-child(1) {
		--size: 0.8vw;
		--left-ini: 0vw;
		--left-end: -1vw;
		left: 70vw;
		animation: snowfall 9s linear infinite;
		animation-delay: -1s;
	}

	.snow:nth-child(2) {
		--size: 0.2vw;
		--left-ini: -7vw;
		--left-end: 10vw;
		left: 65vw;
		animation: snowfall 15s linear infinite;
		animation-delay: -8s;
	}

	.snow:nth-child(3) {
		--size: 1vw;
		--left-ini: 6vw;
		--left-end: 6vw;
		left: 1vw;
		animation: snowfall 9s linear infinite;
		animation-delay: -7s;
	}

	.snow:nth-child(4) {
		--size: 0.2vw;
		--left-ini: -3vw;
		--left-end: 9vw;
		left: 88vw;
		animation: snowfall 14s linear infinite;
		animation-delay: -5s;
	}

	.snow:nth-child(5) {
		--size: 0.4vw;
		--left-ini: -2vw;
		--left-end: -9vw;
		left: 74vw;
		animation: snowfall 6s linear infinite;
		animation-delay: -4s;
	}

	.snow:nth-child(6) {
		--size: 0.2vw;
		--left-ini: 5vw;
		--left-end: 1vw;
		left: 35vw;
		animation: snowfall 6s linear infinite;
		animation-delay: -7s;
	}

	.snow:nth-child(7) {
		--size: 0.4vw;
		--left-ini: -2vw;
		--left-end: -1vw;
		left: 27vw;
		animation: snowfall 10s linear infinite;
		animation-delay: -8s;
	}

	.snow:nth-child(8) {
		--size: 1vw;
		--left-ini: -9vw;
		--left-end: -2vw;
		left: 69vw;
		animation: snowfall 8s linear infinite;
		animation-delay: -8s;
	}

	.snow:nth-child(9) {
		--size: 0.2vw;
		--left-ini: -1vw;
		--left-end: -5vw;
		left: 84vw;
		animation: snowfall 11s linear infinite;
		animation-delay: -6s;
	}

	.snow:nth-child(10) {
		--size: 0.2vw;
		--left-ini: 7vw;
		--left-end: -9vw;
		left: 82vw;
		animation: snowfall 10s linear infinite;
		animation-delay: -3s;
	}

	.snow:nth-child(11) {
		--size: 0.6vw;
		--left-ini: -2vw;
		--left-end: -1vw;
		left: 48vw;
		animation: snowfall 10s linear infinite;
		animation-delay: -1s;
	}

	.snow:nth-child(12) {
		--size: 0.2vw;
		--left-ini: 5vw;
		--left-end: 6vw;
		left: 39vw;
		animation: snowfall 15s linear infinite;
		animation-delay: -8s;
	}
</style>
