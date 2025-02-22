<script>
	let { children } = $props();
</script>

<div class="main">
	{@render children()}
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.main {
		width: 100vw;
		height: 100dvh;
		margin: 0;
		background-image: url('/forrest-base-bg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
		filter: brightness(0.9);
		display: flex;
	}

	.main::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #53c5a0;
		mix-blend-mode: overlay;
	}
</style>
