<script>
	import Menu from '$lib/components/menu.svelte';
	import '@fontsource-variable/figtree';
	let { children } = $props();
</script>

<Menu />

<div class="common-page">
	{@render children()}
</div>

<style>
	.common-page {
		padding: 20px;
		flex: 1;
	}
</style>
