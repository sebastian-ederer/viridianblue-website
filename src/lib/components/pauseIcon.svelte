<div class="pause-icon"></div>

<style>
	.pause-icon {
		width: 24px;
		height: 32px;
		position: relative;
		display: inline-block;
	}

	.pause-icon::before,
	.pause-icon::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 32px;
		border: 1px solid #002958;
		border-radius: 3px;
	}

	.pause-icon::before {
		left: 0;
	}

	.pause-icon::after {
		right: 0;
	}
</style>
