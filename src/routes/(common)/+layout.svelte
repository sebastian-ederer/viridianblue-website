<script>
	import Menu from '$lib/components/menu.svelte';
	import '@fontsource-variable/figtree';
	let { children } = $props();
</script>

<div class="common-page">
	<Menu />
	{@render children()}
</div>

<style>
	.common-page {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
