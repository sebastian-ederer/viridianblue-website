<script lang="ts">
	import { fly } from 'svelte/transition';
	import { removeToast } from '$lib/stores/toastStore';

	export let id: number;
	export let type: 'success' | 'error' = 'success';
	export let message = '';
	export let duration = 5000;

	const circumference = 2 * Math.PI * 18;
</script>

<div
	class="toast"
	class:success={type === 'success'}
	class:error={type === 'error'}
	in:fly={{ y: 20, duration: 300 }}
	out:fly={{ y: -20, duration: 300 }}
	role="alert"
	aria-live="assertive"
	style="--toast-duration: {duration}ms"
>
	<span class="message">{message}</span>

	<button class="close-btn" on:click={() => removeToast(id)} aria-label="Close">
		<svg class="progress-ring" width="40" height="40">
			<circle class="progress-ring__bg" r="18" cx="20" cy="20" />
			<circle
				class="progress-ring__circle"
				r="18"
				cx="20"
				cy="20"
				stroke-dasharray="{circumference} {circumference}"
				stroke-dashoffset={circumference}
			/>
		</svg>
		<span class="close-icon">&times;</span>
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
		padding: 0.75em 1em 0.75em 1.5em;
		border-radius: 8px;
		color: #fff;
		font-weight: 500;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		width: 100%;
		max-width: 25em;
	}

	.success {
		background-color: #28a745;
	}

	.error {
		background-color: #dc3545;
	}

	.message {
		flex-grow: 1;
		text-align: left;
	}

	.close-btn {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
		flex-shrink: 0;
	}

	.close-icon {
		position: absolute;
		color: white;
		font-size: 1.5rem;
		line-height: 1;
		font-weight: bold;
		transition: transform 0.2s ease;
	}

	.progress-ring {
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(-90deg);
	}

	.progress-ring__bg {
		fill: transparent;
		stroke: rgba(255, 255, 255, 0.2);
		stroke-width: 3;
	}

	.progress-ring__circle {
		fill: transparent;
		stroke: rgba(255, 255, 255, 0.7);
		stroke-width: 3;
		stroke-linecap: round;
		animation: progress var(--toast-duration) linear forwards;
	}

	@keyframes progress {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: var(--circumference, 113.097);
		}
	}
</style>
