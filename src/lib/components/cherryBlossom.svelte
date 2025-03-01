<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	const TOTAL = 100;
	const petalArray: Petal[] = [];

	const petalImg = new Image();
	petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';

	onMount(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext('2d');

		if (ctx) {
			petalImg.onload = () => {
				for (let i = 0; i < TOTAL; i++) {
					petalArray.push(new Petal(0.3, 0.3, 0.3)); // Set the speed to 30% of the normal speed
				}
				render(ctx);
			};
		}

		window.addEventListener('resize', resizeCanvas);
	});

	onDestroy(() => {
		window.removeEventListener('resize', resizeCanvas);
	});

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function render(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		petalArray.forEach((petal) => petal.animate(ctx));
		window.requestAnimationFrame(() => render(ctx));
	}

	class Petal {
		x: number;
		y: number;
		w: number;
		h: number;
		opacity: number;
		flip: number;

		xSpeed: number;
		ySpeed: number;
		flipSpeed: number;

		constructor(
			xSpeedMultiplier: number = 0.3,
			ySpeedMultiplier: number = 0.3,
			flipSpeedMultiplier: number = 0.3
		) {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height * 2 - canvas.height;
			this.w = 25 + Math.random() * 15;
			this.h = 20 + Math.random() * 10;
			this.opacity = this.w / 40;
			this.flip = Math.random();

			// Apply speed multipliers (set to 30% speed)
			this.xSpeed = (1.5 + Math.random() * 2) * xSpeedMultiplier;
			this.ySpeed = (1 + Math.random() * 1) * ySpeedMultiplier;
			this.flipSpeed = Math.random() * 0.03 * flipSpeedMultiplier;
		}

		draw(ctx: CanvasRenderingContext2D) {
			if (this.y > canvas.height || this.x > canvas.width) {
				this.x = -petalImg.width;
				this.y = Math.random() * canvas.height * 2 - canvas.height;
				this.xSpeed = (1.5 + Math.random() * 2) * 1; // Reset with default multiplier
				this.ySpeed = (1 + Math.random() * 1) * 1; // Reset with default multiplier
				this.flip = Math.random();
			}
			ctx.globalAlpha = this.opacity;
			ctx.drawImage(
				petalImg,
				this.x,
				this.y,
				this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
				this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
			);
		}

		animate(ctx: CanvasRenderingContext2D) {
			this.x += this.xSpeed;
			this.y += this.ySpeed;
			this.flip += this.flipSpeed;
			this.draw(ctx);
		}
	}
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}
</style>
