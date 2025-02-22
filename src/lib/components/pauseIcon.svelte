<div class="pause-icon"></div>

<style>
	.pause-icon {
		width: 24px; /* Adjust as needed */
		height: 32px; /* Adjust as needed */
		position: relative;
		display: inline-block; /* Or block, flex, etc. */
	}

	.pause-icon::before,
	.pause-icon::after {
		content: '';
		position: absolute;
		width: 8px; /* Adjust width of bars */
		height: 32px; /* Match the height of the container */
		border: 1px solid #002958;
		border-radius: 3px; /* Optional: Rounded corners */
	}

	.pause-icon::before {
		left: 0;
	}

	.pause-icon::after {
		right: 0;
	}

	/* Optional: Add click effect */

	.pause-icon:active::before,
	.pause-icon:active::after {
		transform: scaleY(0.95); /* Slightly shorten the bars on click */
	}
</style>
