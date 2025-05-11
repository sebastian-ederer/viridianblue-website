<script>
	import '$lib/theme/colors.css';
	import '@fontsource-variable/dancing-script';
	import '@fontsource-variable/figtree';
	let { children } = $props();
</script>

<div class="main">
	{@render children()}
</div>

<style lang="scss">
	:global(body) {
		margin: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.main {
		font-family: 'Figtree Variable', sans-serif;
		width: 100vw;
		height: 100dvh;
		margin: 0;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}
</style>
