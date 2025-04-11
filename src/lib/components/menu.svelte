<script lang="ts">
	import { page } from '$app/state';
	import Experience from './icons/experience.svelte';
	import Logo from './icons/logo.svelte';
	import Person from './icons/person.svelte';

	let isOpen = $state(false);
	const isActive = (route: string) => page.url.pathname === route;

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const closeMenuIfMobile = () => {
		if (window.innerWidth < 480) {
			isOpen = false;
		}
	};
</script>

<div class="menu-container">
	<button aria-label="toggle menu" class="burger-menu" onclick={toggleMenu}>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
	</button>

	<div class="menu" class:open={isOpen}>
		<div class="inner-menu">
			<div class="menu-group">
				<a href="/" onclick={closeMenuIfMobile}>
					<span class="icon"><Logo /></span>
					<span class:active={isActive('/')}>Home</span>
				</a>
			</div>

			<div class="menu-group">
				<a href="/about" onclick={closeMenuIfMobile}>
					<span class="icon"><Person /></span>
					<span class:active={isActive('/about')}>About</span>
				</a>

				<div class="dropdown">
					<a href="/imprint" onclick={closeMenuIfMobile}>
						<span class:active={isActive('/imprint')}>Imprint</span>
					</a>
				</div>
			</div>

			<div class="menu-group">
				<a href="/experience" onclick={closeMenuIfMobile}>
					<span class="icon"><Experience /></span>
					<span class:active={isActive('/experience')}>Experience</span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.icon {
		width: 18px;
		height: 18px;
		display: inline;
	}
	.menu-container {
		background-color: #1d1d1d;
		width: 100%;
		height: 60px;
		position: sticky;
		top: 0;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 4px 20px;

		@media (min-width: 480px) {
			justify-content: center;
		}
	}

	.burger-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 20px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;

		.bar {
			width: 100%;
			height: 3px;
			background-color: #fff;
			transition: 0.4s;
		}

		@media (min-width: 480px) {
			display: none;
		}
	}

	.menu {
		width: 0;
		position: fixed;
		top: 60px;
		left: 0;
		right: 0;
		height: calc(100dvh - 60px);
		overflow: hidden;
		background-color: #292929;

		transition: 0.3s;

		@media (min-width: 480px) {
			background-color: #1d1d1d;
			display: flex;
			top: 0;
			flex-direction: row;
			gap: 20px;
			justify-content: center;
			align-items: center;
			height: 60px;
			width: 100%;
			overflow: visible;
		}
	}

	.inner-menu {
		display: flex;
		padding: 20px;
		flex-direction: column;
		gap: 20px;
		height: 100%;

		@media (min-width: 480px) {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 60px;
			width: 100%;
			padding: 0;
		}
	}

	.open {
		width: 480px;
		max-width: 100vw;
	}

	a {
		color: #fff;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		gap: 12px;
		position: relative;
		transition: color 0.3s ease;
		align-items: center;
		height: auto;

		@media (min-width: 480px) {
			height: 60px;
		}
	}

	a span:not(.icon) {
		position: relative;
		transition: color 0.3s ease;
	}

	a span:not(.icon)::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -2px;
		width: 0%;
		height: 2px;
		background-color: #73c6b6;
		transition: width 0.3s ease;
	}

	a:hover span:not(.icon) {
		color: #73c6b6;
	}

	a:hover span:not(.icon)::after {
		width: 100%;
	}

	a span:not(.icon).active {
		color: #73c6b6;
		font-weight: 600;
	}

	a span:not(.icon).active::after {
		width: 100%;
		background-color: #73c6b6;
	}

	@media (max-width: 480px) {
		a span:not(.icon).active {
			border: none;
		}
	}

	.menu-group {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.menu-group:hover .dropdown {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.dropdown {
		padding: 12px 0 0 60px;
		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: 480px) {
			position: absolute;
			top: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			border-radius: 0 0 4px 4px;
			overflow: hidden;
			z-index: 10;
			min-width: calc(100% + 8px);
			margin-top: 0;
			padding: 6px 6px 12px 6px;
			width: calc(100% - 18px);

			opacity: 0;
			transform: translateY(-10px);
			transition:
				opacity 0.3s ease,
				transform 0.3s ease;
		}

		a {
			height: fit-content;
		}
	}
</style>
