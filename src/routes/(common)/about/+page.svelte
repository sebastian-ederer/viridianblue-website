<script lang="ts">
	import SeasonBackground from '$lib/components/seasonBackground.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Swiper from 'swiper';
	import 'swiper/css/bundle';
	import { A11y, Autoplay, Keyboard, Mousewheel, Navigation, Scrollbar } from 'swiper/modules';

	let swiper: Swiper | null = $state(null);
	let season: 'spring' | 'summer' | 'fall' | 'winter' = $state('summer');

	onMount(() => {
		swiper = new Swiper('.swiper', {
			modules: [Scrollbar, Mousewheel, Keyboard, Autoplay, Navigation, A11y],
			mousewheel: true,
			keyboard: true,
			speed: 700,
			autoplay: {
				delay: 20000
			},
			slidesPerView: 1,
			loop: true,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
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

<svelte:head>
	<title>About Me</title>
	<link rel="preload" href="/forrest-base-bg-fall.png" as="image" />
	<link rel="preload" href="/forrest-base-bg-spring.png" as="image" />
	<link rel="preload" href="/forrest-base-bg-summer.png" as="image" />
	<link rel="preload" href="/forrest-base-bg-winter.png" as="image" />
</svelte:head>

<div class="about">
	<SeasonBackground {season} />
	<div class="swiper">
		<div class="swiper-wrapper">
			<div data-season="summer" class="slide swiper-slide">
				<div class="card">
					<div class="introduction">
						<img alt="pic" src="/profile_pic.jpg" />
						<div>
							<h2>Introduction</h2>
							<p>
								Hi, my name is <strong>Sebastian</strong>, and I'm a Software Developer from
								Germany. My interest in programming sparked around the age of 12. This early passion
								led me to pursue computer science, culminating in both a <strong>B.Sc.</strong> and
								an
								<strong>M.Sc.</strong>
								degree. <br /><br />
								During my fifth semester, I began working as a software developer at a professional company
								while continuing my studies. From the very beginning, I had direct interaction with great
								customers and even greater colleagues, which allowed me to learn a tremendous amount.
								<br /><br />Today, I am confident in my abilities and consistently seek out new
								challenges to hone them. Happy coding to all my colleagues!
							</p>
						</div>
					</div>
				</div>
			</div>

			<div data-season="fall" class="slide swiper-slide">
				<div class="card">
					<h2>My Approach</h2>
					<p>
						A key priority in my work is developing scalable and maintainable software architectures
						that ensure the long-term success of a project. As a Full Stack Developer and IT
						Consultant, I bring an ideal combination of technical expertise, strategic foresight,
						and the ability to implement complex projects efficiently and with a clear focus. My
						goal is not only to create high-quality applications tailored to diverse industries and
						the unique requirements of my clients, but also to structure the development process in
						a way that keeps efficiency and sustainability at its core. This involves a deep
						understanding of architectural patterns and best practices to build robust and adaptable
						systems.
					</p>
				</div>
			</div>

			<div data-season="winter" class="slide swiper-slide">
				<div class="card">
					<h2>Development</h2>
					<p>
						As an expert in both frontend and backend technologies, I am capable of developing
						robust and high-performance applications from a single source. My proficiency extends
						across the entire development lifecycle, allowing for seamless integration and optimized
						solutions. Using modern frameworks such as React/Next.js and Svelte/SvelteKit, I create
						appealing, responsive user interfaces that meet the highest standards of user experience
						and accessibility. On the backend, I leverage my extensive experience with the .NET
						ecosystem and relational database systems like PostgreSQL and Microsoft SQL Server
						(MSSQL). Additionally, I have solid expertise in developing cross-platform applications
						(Web, Android, iOS) using Capacitor.js, ensuring seamless implementation and consistent
						performance across different platforms, providing comprehensive solutions for diverse
						project needs.
					</p>
				</div>
			</div>

			<div data-season="spring" class="slide swiper-slide">
				<div class="card">
					<h2>Integration</h2>
					<p>
						For automation and deployment, I have extensive experience with modern cloud
						technologies such as AWS ECS and AWS Amplify, alongside containerization with Docker and
						continuous integration/continuous deployment (CI/CD) pipelines using GitHub Actions.
						These technologies enable efficient and reliable deployments, allowing for more focus on
						the core development tasks. Additionally, I possess expertise in implementing secure
						authentication and authorization systems based on OAuth 2.0 and ensuring accessibility
						according to WCAG standards. Furthermore, a significant focus in my work is on quality
						assurance. I plan and execute comprehensive tests at all levels, from Unit Tests (e.g.,
						with NUnit, Jest) and End-to-End tests (e.g., with Playwright) to Mocking solutions
						using libraries like MSW, FakeItEasy, and NSubstitute. With these capabilities, I help
						bring comprehensive and future-proof products to life, ensuring both functionality and
						long-term maintainability.
					</p>
				</div>
			</div>
		</div>
		<div class="navigation">
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
		<div class="swiper-scrollbar"></div>
	</div>
</div>

<style lang="scss">
	.about {
		max-width: 100dvw;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.swiper-wrapper {
		@media (min-width: 480px) {
			display: grid;
			grid-template-rows: 1fr auto 1fr;
		}
	}

	.slide {
		grid-row: 2/3;
		background-color: rgba(39, 39, 39, 0.5);
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
		padding: 20px;
		overflow-y: auto;
		backdrop-filter: blur(2px);
		width: 100%;
		text-align: center;
		height: 100%;

		@media (min-width: 480px) {
			padding: 40px 20px;
			grid-row: 2/3;
		}

		h2 {
			font-family: 'Dancing Script Variable', cursive;
			color: #fff;
			font-size: 2rem;
		}

		p {
			max-width: 650px;
		}

		.introduction {
			display: flex;
			justify-content: center;
			align-items: center;
			max-width: 650px;
			flex-direction: column;

			img {
				width: 125px;
				height: 125px;
				border-radius: 50%;
				object-fit: cover;
				object-position: top center;
				overflow: hidden;
				flex-shrink: 0;
			}
		}
	}

	.navigation {
		--swiper-theme-color: rgba(255, 255, 255, 0.5);
		--swiper-navigation-size: 24px;
		display: none;

		@media (min-width: 768px) {
			display: block;
		}
	}
</style>
