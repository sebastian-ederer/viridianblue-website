<script lang="ts">
	import Birds from '$lib/components/birds.svelte';
	import Particles from '$lib/components/particles.svelte';
	import SunRays from '$lib/components/sunRays.svelte';
	import CherryBlossom from './cherryBlossom.svelte';
	import SnowAnimation from './snowAnimation.svelte';

	export let season: 'spring' | 'summer' | 'fall' | 'winter' = 'summer';
	let backgroundImageElement: HTMLDivElement;

	$: if (season) {
		if (backgroundImageElement) {
			const newBackgroundImage = backgroundImageElement.cloneNode(true) as HTMLDivElement;
			backgroundImageElement.replaceWith(newBackgroundImage);
			backgroundImageElement = newBackgroundImage;
			backgroundImageElement.classList.add('animate');
		}
	}
</script>

<div class={['background', season]}>
	<div class={['background-colored-image']} data-swiper-parallax="-23%"></div>
	<div bind:this={backgroundImageElement} class={['background-image']}></div>
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
		background-image: url('/forrest-base-bg-summer.png');
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
			background-image: url('/forrest-base-bg-summer.png');
		}
	}

	.fall {
		.background-colored-image::before {
			background-color: rgb(153, 100, 79);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-fall.png');
		}
	}

	.winter {
		.background-colored-image::before {
			background-color: rgb(152, 175, 201);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-winter.png');
		}
	}

	.spring {
		.background-colored-image::before {
			background-color: rgb(208, 145, 168);
		}

		.background-image,
		.background-colored-image {
			background-image: url('/forrest-base-bg-spring.png');
		}
	}
</style>
