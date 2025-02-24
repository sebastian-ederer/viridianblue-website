<script>
	import Background from '$lib/components/background.svelte';
	import '@fontsource-variable/figtree';
	let { children } = $props();
</script>

<div class="main">
	<Background />
	{@render children()}
</div>

<style>
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
	}
</style>
