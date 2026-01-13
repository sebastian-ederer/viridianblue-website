<script lang="ts">
	import Birds from '$lib/components/birds.svelte';
	import LeafeAnimation from '$lib/components/leafeAnimation.svelte';
	import Particles from '$lib/components/particles.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
	import CherryBlossom from './cherryBlossom.svelte';
	import SnowAnimation from './snowAnimation.svelte';

	let { season = 'summer' }: { season: 'spring' | 'summer' | 'fall' | 'winter' } = $props();
</script>

<div class={`background ${season}`}>
	<div class="background-colored-image" data-swiper-parallax="-23%"></div>
	{#key season}
		<div class="background-image"></div>
	{/key}
	{#if season === 'summer' || season == 'spring' || season == 'fall'}
		<Birds />
	{/if}

	{#if season === 'summer'}
		<SunRays />
		<Particles />
	{/if}

	{#if season === 'winter'}
		<SnowAnimation />
	{/if}

	{#if season === 'spring'}
		<CherryBlossom />
	{/if}

	{#if season === 'fall'}
		<LeafeAnimation />
	{/if}
</div>

<style lang="scss">
	.background {
		position: fixed;
		overflow: hidden;
		inset: 0;
		z-index: -1;
	}

	.background-colored-image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-repeat: no-repeat;

		&:before {
			content: '';
			position: absolute;
			inset: 0;
			mix-blend-mode: overlay;
		}
	}

	.background-image {
		position: absolute;
		inset: 0;
		background-image: url('/forrest-base-bg-summer.webp');
		background-size: cover;
		background-repeat: no-repeat;

		mask-image: url('/inkmask.png');
		mask-size: cover;
		mask-position: 0% 50%;
		-webkit-mask-image: url('/inkmask.png');
		-webkit-mask-size: cover;
		-webkit-mask-position: 0% 50%;

		animation: addColor 1000ms steps(32) forwards;
	}

	@keyframes addColor {
		0% {
			-webkit-mask-position: 0% 50%;
			mask-position: 0% 50%;
		}
		100% {
			-webkit-mask-position: 100% 50%;
			mask-position: 100% 50%;
		}
	}

	.summer {
		.background-colored-image::before {
			background-color: rgb(83, 197, 160);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-summer.webp');
		}
	}

	.fall {
		.background-colored-image::before {
			background-color: rgb(153, 100, 79);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-fall.webp');
		}
	}

	.winter {
		.background-colored-image::before {
			background-color: rgb(152, 175, 201);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-winter.webp');
		}
	}

	.spring {
		.background-colored-image::before {
			background-color: rgb(208, 145, 168);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-spring.webp');
		}
	}
</style>
