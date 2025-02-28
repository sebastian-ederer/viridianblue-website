<script lang="ts">
	import Birds from '$lib/components/birds.svelte';
	import Particles from '$lib/components/particles.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
</script>

<div class="background">
	<Birds />
	<SunRays />
	<Particles />
</div>

<style lang="scss">
	.background {
		position: fixed;
		overflow: hidden;
		inset: 0;
		z-index: -1;
		background-image: url('/forrest-base-bg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
	}

	.background::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		mix-blend-mode: overlay;
		background-color: rgb(83, 197, 160);
	}
</style>
