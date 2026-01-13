<script lang="ts">
	import { onMount } from 'svelte';
	import { BREAKPOINTS, PARTICLES } from '$lib/constants';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0;
	let height = 0;
	let system: ParticleSystem;
	let animationId: number;
	let isVisible = true;

	class Particle {
		x: number = 0;
		y: number = 0;
		vx: number = 0;
		vy: number = 0;
		accelX: number = 0;
		alpha: number = 1;
		size: number = 1;

		constructor(initialSpawn = true) {
			this.reset(initialSpawn);
		}

		reset(initialSpawn = false) {
			this.x = Math.random() * width;
			this.y = initialSpawn ? Math.random() * height : height + Math.random() * height;
			this.vy = -Math.random() * 0.5 - 0.05; // Upward movement
			this.accelX = (Math.random() - 0.5) * 0.002; //horizontal acceleration
			this.alpha = Math.random() * 0.5 + 0.5;
			this.size = Math.random() * 1.5 + 0.75;
		}

		update() {
			this.y += this.vy;

			// Reset if particle reaches top
			if (this.y < -10) {
				this.reset();
			}
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = `rgba(180, 255, 255, ${this.alpha})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}

	class ParticleSystem {
		particles: Particle[];

		constructor(count: number) {
			this.particles = Array.from({ length: count }, () => new Particle());
		}

		update() {
			this.particles.forEach((particle) => particle.update());
		}

		draw(ctx: CanvasRenderingContext2D) {
			this.particles.forEach((particle) => particle.draw(ctx));
		}
	}

	const resizeCanvas = () => {
		width = window.innerWidth;
		height = window.innerHeight;
		if (canvas) {
			canvas.width = width;
			canvas.height = height;
		}
	};

	const draw = () => {
		if (!ctx) return;

		// Background (transparent to blend with other elements)
		ctx.clearRect(0, 0, width, height);

		// Apply additive blending for a soft glow effect
		ctx.globalCompositeOperation = 'lighter';
		system.draw(ctx);
	};

	const animate = () => {
		if (!isVisible) return;
		system.update();
		draw();
		animationId = requestAnimationFrame(animate);
	};

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;

		// Reduce particle count on mobile for better performance
		const particleCount =
			window.innerWidth < BREAKPOINTS.TABLET ? PARTICLES.COUNT_MOBILE : PARTICLES.COUNT_DESKTOP;
		system = new ParticleSystem(particleCount);

		if (canvas) {
			ctx = canvas.getContext('2d');
			resizeCanvas();

			// Intersection Observer to pause animation when off-screen
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						isVisible = entry.isIntersecting;
						if (isVisible && !animationId) {
							animate();
						}
					});
				},
				{ threshold: 0 }
			);
			observer.observe(canvas);

			animate();
			window.addEventListener('resize', resizeCanvas);

			return () => {
				window.removeEventListener('resize', resizeCanvas);
				observer.disconnect();
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			};
		}
	});
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>

<style>
	.particle-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		pointer-events: none;
	}
</style>
