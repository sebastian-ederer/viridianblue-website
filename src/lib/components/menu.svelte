<div class="menu">
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/experience">Experience</a>
</div>

<style>
	.menu {
		background-color: #1d1d1d;
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 20px;
		justify-content: center;
		align-items: center;
		padding: 20px;
		height: 80px;
		position: sticky;
		top: 0;
		z-index: 9;
	}

	a {
		font-size: 1.2rem;
		color: #fff;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
