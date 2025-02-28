<script lang="ts">
	import SeasonBackground from '$lib/components/seasonBackground.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Swiper from 'swiper';
	import 'swiper/css/bundle';
	import { A11y, Autoplay, Keyboard, Mousewheel, Scrollbar } from 'swiper/modules';

	let swiper: Swiper | null = $state(null);
	let season: 'spring' | 'summer' | 'fall' | 'winter' = $state('summer');

	onMount(() => {
		swiper = new Swiper('.swiper', {
			modules: [Scrollbar, Mousewheel, Keyboard, Autoplay, A11y],
			mousewheel: true,
			keyboard: true,
			speed: 700,
			autoplay: {
				delay: 5000
			},
			slidesPerView: 1,
			loop: true,

			scrollbar: {
				el: '.swiper-scrollbar',
				hide: true
			}
		});

		swiper.on('slideChange', () => {
			const activeSlide = swiper?.slides[swiper?.activeIndex];
			if (activeSlide) {
				const newSeason = activeSlide.getAttribute('data-season') as
					| 'spring'
					| 'summer'
					| 'fall'
					| 'winter';
				if (newSeason) {
					season = newSeason;
				}
			}
		});
	});

	onDestroy(() => {
		if (swiper) swiper.destroy(true, true);
	});
</script>

<div class="about">
	<SeasonBackground {season} />
	<div class="swiper">
		<div class="swiper-wrapper">
			<div data-season="summer" class="slide swiper-slide">
				<div class="card">
					<h2>Introduction</h2>
					<p>
						Hi and welcome to my Website! Glad you found it. <br />
						My name is Sebastian and I am a Software Developer from Germany who just wants to have fun
						building awesome stuff.
					</p>
				</div>
			</div>

			<div data-season="fall" class="slide swiper-slide">
				<div class="card">
					<h2>My Approach</h2>

					<p>
						A key priority in my work is developing scalable and maintainable software architectures
						that ensure the long-term success of a project. My goal is not only to create
						high-quality applications but also to structure the development process in a way that
						keeps efficiency and sustainabilityat the core.
					</p>
				</div>
			</div>

			<div data-season="winter" class="slide swiper-slide">
				<div class="card">
					<h2>Development</h2>
					<p>
						As an expert in both frontend and backend technologies, I am capable of developing
						robust and high-performance applications from a single source. Using modern frameworks
						such as React/Next.js, Svelte/SvelteKit, I create appealing, responsive user interfaces
						that meet the highest standards. On the backend, I leverage my extensive experience with
						.NET, AWS and relational database systems like PostgreSQL and MSSQL. Additionally, I
						have solid expertise in developing cross-platform applications (Web, Android, iOS) using
						Capacitor.js, ensuring seamless implementation across different platforms.
					</p>
				</div>
			</div>

			<div data-season="spring" class="slide swiper-slide">
				<div class="card">
					<h2>Integration</h2>

					<p>
						For automation and deployment, I have extensive experience with modern cloud
						technologies such as AWS ECS, AWS Amplify, Docker, and GitHub Actions. These
						technologies enable efficient deployments, allowing more focus on development itself.
						Additionally, I have expertise in implementing secure authentication and authorization
						systems based on OAuth 2.0, ensuring accessibility (WCAG standards) and integrating
						payment systems with Stripe. With these capabilities, I help bring comprehensive and
						future-proof products to life.
					</p>
				</div>
			</div>
		</div>
		<div class="swiper-scrollbar"></div>
	</div>
</div>

<style lang="scss">
	.about {
		max-width: 100vw;
		height: calc(100dvh - 80px);
		display: flex;
		flex-direction: column;
	}

	.slide {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.swiper {
		flex: 1;
		width: 100%;
	}

	:global(.swiper-backface-hidden .swiper-slide) {
		transform: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		background-color: rgba(39, 39, 39, 0.5);
		padding: 20px;
		overflow-y: auto;
		backdrop-filter: blur(5px);
		height: 325px;
		width: 100%;

		h2 {
			font-family: 'Dancing Script Variable', cursive;
			color: #fff;
			font-size: 2rem;
		}

		p {
			max-width: 650px;
			text-align: center;
		}

		@media (max-width: 480px) {
			height: 100%;
			backdrop-filter: blur(2px);
		}
	}
</style>
