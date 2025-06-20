<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = $state(null);
	let animationFrameId: number;

	const TOTAL = 75;
	const petalArray: Petal[] = [];
	let petalImg: HTMLImageElement | null = $state(null);
	const globalSpeedMultiplier = 0.2;

	onMount(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d');

		if (ctx) {
			petalImg = new Image();
			petalImg.src = '/petal.png';
			petalImg.onload = () => {
				for (let i = 0; i < TOTAL; i++) {
					petalArray.push(
						new Petal(globalSpeedMultiplier, globalSpeedMultiplier, globalSpeedMultiplier)
					);
				}
				render();
			};
		}

		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);

			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId);
			}
			ctx = null;
		};
	});

	const resizeCanvas = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	const render = () => {
		if (ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			petalArray.forEach((petal) => petal.animate(ctx!));
			animationFrameId = window.requestAnimationFrame(() => render());
		}
	};

	class Petal {
		x: number;
		y: number;
		w: number;
		h: number;
		opacity: number;
		flip: number;
		scale: number;

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
			this.scale = 0.5 + Math.random() / 2;

			// Apply speed multipliers (set to 30% speed)
			this.xSpeed = (1.5 + Math.random() * 2) * xSpeedMultiplier;
			this.ySpeed = (1 + Math.random()) * ySpeedMultiplier;
			this.flipSpeed = Math.random() * 0.03 * flipSpeedMultiplier;
		}

		draw(ctx: CanvasRenderingContext2D) {
			if (this.y > canvas.height || this.x > canvas.width || !petalImg) {
				this.x = petalImg?.width ? -petalImg.width : 0;
				this.y = Math.random() * canvas.height * 2 - canvas.height;
				this.xSpeed = (1.5 + Math.random() * 2) * globalSpeedMultiplier;
				this.ySpeed = (1 + Math.random()) * globalSpeedMultiplier;
				this.flip = Math.random();
				this.scale = 0.5 + Math.random() / 2;
			}
			if (petalImg) {
				ctx.globalAlpha = this.opacity;
				ctx.drawImage(
					petalImg,
					this.x,
					this.y,
					this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3) * this.scale,
					this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5) * this.scale
				);
			}
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
