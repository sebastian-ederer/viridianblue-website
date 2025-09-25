<script>
	import Menu from '$lib/components/menu.svelte';
	import Toaster from '$lib/components/toaster.svelte';
	import '@fontsource-variable/figtree';
	let { children } = $props();
</script>

<div class="common-page">
	<Toaster />
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
