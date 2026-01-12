<script lang="ts">
	import { page } from '$app/state';
	import Contact from './icons/contact.svelte';
	import Github from './icons/github.svelte';
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
	<button aria-label="toggle menu" class="burger-menu" class:open={isOpen} onclick={toggleMenu}>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
	</button>

	<a href="https://github.com/sebastian-ederer" target="_blank" class="socials">
		<Github />
	</a>

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
				<a href="/contact" onclick={closeMenuIfMobile}>
					<span class="icon"><Contact /></span>
					<span class:active={isActive('/contact')}>Contact me</span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.icon {
		width: 1.125em;
		height: 1.125em;
		display: inline;
	}
	.menu-container {
		background-color: #1d1d1d;
		width: 100%;
		height: 3.75em;
		position: sticky;
		top: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 0.25em 1.25em;

		@media (min-width: 480px) {
			justify-content: center;
		}
	}

	.burger-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 1.875em;
		height: 1.25em;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;

		&:focus {
			outline: none;
		}

		.bar {
			width: 1.5rem;
			height: 0.25rem;
			background: #fff;
			border-radius: 10px;
			transition: all 0.3s ease-in-out;
			position: relative;
		}

		@media (min-width: 480px) {
			display: none;
		}
	}

	.burger-menu.open .bar:nth-child(1) {
		transform: translateY(0.25rem) rotate(45deg);
	}

	.burger-menu.open .bar:nth-child(2) {
		opacity: 0;
	}

	.burger-menu.open .bar:nth-child(3) {
		transform: translateY(-0.5rem) rotate(-45deg);
	}

	.menu {
		width: 0;
		position: fixed;
		top: 3.75em;
		left: 0;
		right: 0;
		height: calc(100dvh - 3.75em);
		overflow: hidden;
		background-color: #292929;

		transition: 0.3s;

		@media (min-width: 480px) {
			background-color: #1d1d1d;
			display: flex;
			top: 0;
			flex-direction: row;
			gap: 1.25em;
			justify-content: center;
			align-items: center;
			height: 3.75em;
			width: 100%;
			overflow: visible;
		}
	}

	.inner-menu {
		display: flex;
		padding: 1.25em;
		flex-direction: column;
		gap: 1.25em;
		height: 100%;

		@media (min-width: 480px) {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 3.75em;
			width: 100%;
			padding: 0;
		}
	}

	.open {
		width: 480px;
		max-width: 100dvw;
	}

	a {
		color: #fff;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		gap: 0.75em;
		position: relative;
		transition: color 0.3s ease;
		align-items: center;
		height: auto;

		@media (min-width: 480px) {
			height: 3.75em;
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
		bottom: -0.125em;
		width: 0%;
		height: 0.125em;
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

	.menu-group {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		white-space: nowrap;
	}

	.menu-group:hover .dropdown {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.dropdown {
		padding: 0.75em 0 0 3.75em;
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
			min-width: calc(100% + 0.5em);
			margin-top: 0;
			padding: 0.375em 0.375em 0.75em 0.375em;
			width: calc(100% - 1.125em);

			opacity: 0;
			transform: translateY(-0.625em);
			transition:
				opacity 0.3s ease,
				transform 0.3s ease;
		}

		a {
			height: fit-content;
		}
	}

	.socials {
		position: absolute;
		right: 1.25em;
		z-index: 1;
		display: flex;
		align-items: center;
		height: auto;

		&:hover {
			color: #73c6b6;
		}

		:global(svg) {
			width: 1.25em;
			height: 1.25em;
		}
	}
</style>
